import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Text } from '../../components';
import AddToCircleDialog from '../../components/Reusable/AddToCircleDialog';

import ProfileGlance from '../../components/Reusable/ProfileGlance';
import { db } from '../../firebase';
import CircleUserType, { convertCUJsonToObj } from '../../models/CircleUser';
import { FS_USER_DB, FS_CIRCLE_USERS_DB } from '../../common/constants';
import { cu_addUser, cu_init } from '../../redux/myCircleList';
import { RootState, useAppDispatch } from '../../redux/store';
import { CircleUserDBKeys } from '../../common/dbKeys';
import UserType from '../../models/User';

type Props = {
  isMe: boolean;
  user: UserType;
};

const MyCircle: FC<Props> = ({ isMe, user }) => {
  const circleUsers = useSelector((state: RootState) => state.circleUser.list);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const fetchAndUpdateCircleUsers = async () => {
    try {
      const dbCU: Array<CircleUserType> = [];

      const col = collection(db, FS_CIRCLE_USERS_DB);
      const q = query(col, where(CircleUserDBKeys.userCircle, '==', user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        dbCU.push(convertCUJsonToObj(doc.data(), doc.id));
      });

      dispatch(cu_init(dbCU));
    } catch (e) {
      console.log(e);
      // TODO handle error
    }
  };

  useEffect(() => {
    if (circleUsers.length === 0 && user) {
      fetchAndUpdateCircleUsers();
    }
  }, [user.uid]);

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6'>
        {isMe && (
          <div className='flex flex-col space-y-10 justify-center items-center py-10'>
            <Button
              icon={{
                iconName: 'Add',
                size: '40'
              }}
              defautStyle='cust-btn-btn'
              onClick={() => setOpenModal(true)}
              styleClasses='text-lg !rounded-full !py-2 !px-2'
              wrapperClasses='mx-2'
            />
            <Text content='Add to Circle' />
          </div>
        )}
        {circleUsers.map(cu => (
          <ProfileGlance
            uid={cu.userAdded}
            key={cu.docid}
            relation={cu.relation}
            status={cu.status}
          />
        ))}
      </div>
      <AddToCircleDialog
        open={openModal}
        onClose={closeModal}
        circleUserIds={circleUsers.map(cu => cu.userAdded)}
        currentUser={user}
        isPresentInCircle={false}
      />
    </>
  );
};

export default MyCircle;
