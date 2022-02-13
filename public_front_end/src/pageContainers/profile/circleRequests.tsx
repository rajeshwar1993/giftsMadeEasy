import {
  collection,
  where,
  query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FF_READ_PUBLIC_USER_DATA,
  FS_CIRCLE_USERS_DB,
  FS_USER_DB
} from '../../common/constants';
import { CircleUserDBKeys } from '../../common/dbKeys';
import { logError } from '../../common/utils';
import { Button, SectionTitle, Text } from '../../components';
import AddToCircleDialog from '../../components/Reusable/AddToCircleDialog';
import OKCancelBtn from '../../components/Reusable/OKCancelBtn';
import { MiniProfile } from '../../components/Reusable/ProfileGlance';
import { db, functions } from '../../firebase';
import CircleUserType, { convertCUJsonToObj } from '../../models/CircleUser';
import UserType, { convertUserJsonToObj } from '../../models/User';
import { app_sendToast } from '../../redux/appCommon';
import { sl_addUserToList } from '../../redux/simpleLists';
import { RootState, useAppDispatch } from '../../redux/store';

type Props = {
  isMe: boolean;
  user: UserType;
};

const CircleRequests: FC<Props> = ({ isMe, user }) => {
  const userList = useSelector(
    (state: RootState) => state.simpleLists.userList
  );
  const currentUserCircle = useSelector(
    (state: RootState) => state.circleUser.list
  );
  const dispatch = useAppDispatch();

  const [requests, setRequests] = useState<Array<CircleUserType>>([]);
  const [userToAdd, setUserToAdd] = useState<string | null>();

  const fetchRequests = async () => {
    try {
      const colRef = collection(db, FS_CIRCLE_USERS_DB);
      const q = query(
        colRef,
        where(CircleUserDBKeys.userAdded, '==', user.uid),
        where(CircleUserDBKeys.status, '==', 'p')
      );
      const snap = await getDocs(q);

      const cu: Array<CircleUserType> = [];

      const promises: any = [];
      const getUser = httpsCallable(functions, FF_READ_PUBLIC_USER_DATA);
      snap.forEach(s => {
        const d = convertCUJsonToObj(s.data(), s.id);
        cu.push(d);

        // check if cu is not in user list
        if (!userList[d.userCircle]) {
          promises.push(getUser({ userID: d.userCircle }));
        }
      });

      const res = await Promise.allSettled(promises);
      let newUsers: { [key: string]: UserType } = {};
      res.forEach(r => {
        if (r.status === 'fulfilled') {
          let data = r.value.data;
          if (!data.error) {
            const u = convertUserJsonToObj(data.userData, data.userID);
            newUsers[data.userID] = u;
          }
        }
      });

      // add to simple user list
      dispatch(sl_addUserToList(newUsers));

      // update circle user array
      setRequests(cu);
    } catch (e: any) {
      logError(e.message, e.stack, 'fetchRequests', 'CircleRequests', {
        userID: user.uid
      });
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in fetching circle user requests.'
        })
      );
    }
  };

  const updateCircleRequest = async (docId: string, status: 'a' | 'r') => {
    try {
      const colRef = collection(db, FS_CIRCLE_USERS_DB);

      if (status === 'a') {
        updateDoc(doc(colRef, docId), {
          [CircleUserDBKeys.status]: 'a'
        });

        setRequests(state =>
          state.map(s => {
            if (docId === s.docid) {
              return {
                ...s,
                status: 'a'
              };
            }
            return s;
          })
        );
      } else if (status === 'r') {
        setRequests(state => state.filter(s => s.docid !== docId));
        await deleteDoc(doc(colRef, docId));
        dispatch(
          app_sendToast({
            type: 'info',
            message: 'Request Rejected'
          })
        );
      }
    } catch (e: any) {
      logError(e.message, e.stack, 'updateCircleRequest', 'CircleRequests', {
        docId,
        status
      });
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in updating request.'
        })
      );
    }
  };

  const isInMyCircle = useCallback(
    (userId: string) => {
      const filteredList = [...currentUserCircle].find(
        cu => cu.userAdded === userId
      );
      if (!filteredList) {
        return false;
      }
      return true;
    },
    [currentUserCircle]
  );

  const closeModal = () => {
    setUserToAdd(null);
  };

  useEffect(() => {
    if (isMe && user.uid) {
      fetchRequests();
    }
  }, [user, isMe]);

  // incase we dont need to show this
  if (!isMe || requests.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className='space-y-2'>
        <SectionTitle content='Circle Requests' />
        {requests.map(r => (
          <div key={r.docid} className='flex flex-row space-x-4 items-center'>
            <div className='flex flex-col space-y-2 items-center'>
              <MiniProfile
                name={userList[r.userCircle].name}
                imgUrl={userList[r.userCircle].imgUrl}
              />
              {r.status === 'p' && (
                <>
                  <Text
                    content={'wants to add you in their circle'}
                    styleClasses='text-sm'
                  />
                  <OKCancelBtn
                    onSave={() => updateCircleRequest(r.docid, 'a')}
                    onClose={() => updateCircleRequest(r.docid, 'r')}
                  />
                </>
              )}
              {r.status === 'a' && !isInMyCircle(r.userCircle) && (
                <>
                  <Text content={'Request accepted.'} styleClasses='text-sm' />
                  <Button
                    text={`Add ${userList[r.userCircle].name} To Your Circle`}
                    onClick={() => setUserToAdd(r.userCircle)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <AddToCircleDialog
        open={!!userToAdd}
        onClose={closeModal}
        currentUser={user}
        isPresentInCircle={userToAdd ? isInMyCircle(userToAdd) : false}
        modalUserFromParent={userToAdd ? userList[userToAdd] : null}
      />
    </>
  );
};

export default CircleRequests;
