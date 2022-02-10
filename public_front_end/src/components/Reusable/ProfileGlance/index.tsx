import { collection, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, ImageComponent } from '../..';
import { FS_USER_DB } from '../../../common/constants';
import { FilterDBKeys, UserDBKeys } from '../../../common/dbKeys';
import { relationshipFilterValues } from '../../../common/staticFilterValues';
import { createQueryUrlFromObject } from '../../../common/utils';
import { db } from '../../../firebase';
import UserType, { convertUserJsonToObj } from '../../../models/User';
import { app_sendToast } from '../../../redux/appCommon';
import { sl_addUserToList } from '../../../redux/simpleLists';
import { RootState, useAppDispatch } from '../../../redux/store';
import AppLink from '../AppLink';
import { getOptionFromValue } from '../ListBox/utils';

type Props = {
  uid: string;
  relation?: string;
  status: 'a' | 'p' | 'r';
};

const ProfileGlance: FC<Props> = ({ uid, relation, status }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userList = useSelector(
    (state: RootState) => state.simpleLists.userList
  );

  const [userData, setUserData] = useState<UserType | null>(null);

  const createSearchLink = (data: UserType) => {
    const searchUrl =
      '/search?' +
      createQueryUrlFromObject({
        [FilterDBKeys.interests]: data.interestedTags,
        [FilterDBKeys.gender]: data.gender
      });

    return searchUrl;
  };

  const fetchUserData = async (userID: string) => {
    try {
      // check if present in redux
      if (userList[userID]) {
        setUserData(userList[userID]);
      }
      setLoading(true);
      // fetch user data
      let res = await getDoc(doc(collection(db, FS_USER_DB), userID));

      if (res.exists()) {
        const id = res.id;
        const data = res.data();
        const userObj = convertUserJsonToObj(data, id);
        // add to redux
        dispatch(sl_addUserToList({ [id]: userObj }));
        setUserData(userObj);
      } else {
        throw Error('user not found');
      }
    } catch (e) {
      // TODO send error report
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in fetching gifts. Please try again'
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(uid);
  }, [uid]);

  return (
    <div
      className={`flex flex-col items-center text-center py-4 ${
        status === 'a' && 'hover:shadow-lg'
      }`}
    >
      {userData && (
        <>
          <Link href={status === 'a' ? `/profile/${uid}` : `/profile/${uid}`}>
            <div className={`${status === 'a' && 'cursor-pointer'}`}>
              <MiniProfile name={userData.name} imgUrl={userData.imgUrl} />
              {relation && (
                <Text
                  content={
                    'My ' +
                    getOptionFromValue(relationshipFilterValues, relation, '')
                      .text
                  }
                  tag='h3'
                  styleClasses='text-lg font-light'
                />
              )}
            </div>
          </Link>
          {status === 'a' && (
            <AppLink link={createSearchLink(userData)} text='Find Gifts' />
          )}
          {status !== 'a' && <Text content='Request Pending' />}
        </>
      )}
    </div>
  );
};

type MiniProfileProps = {
  imgUrl: string;
  name: string;
};

export const MiniProfile: FC<MiniProfileProps> = ({ imgUrl, name }) => {
  return (
    <>
      <div className='shadow-lg w-24 h-24 xl:w-32 xl:h-32 overflow-hidden border-4 rounded-full mx-auto'>
        <ImageComponent
          src={imgUrl}
          alt={name}
          width={120}
          height={120}
          layout='fixed'
        />
      </div>

      <Text
        content={name || ''}
        tag='h3'
        styleClasses='text-xl font-semibold'
      />
    </>
  );
};

export default ProfileGlance;
