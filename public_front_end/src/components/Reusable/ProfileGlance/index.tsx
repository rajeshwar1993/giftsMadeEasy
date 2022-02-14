import { httpsCallable } from 'firebase/functions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { Text, ImageComponent } from '../..';
import { FF_READ_PUBLIC_USER_DATA } from '../../../common/constants';
import { FilterDBKeys, UserDBKeys } from '../../../common/dbKeys';
import { relationshipFilterValues } from '../../../common/staticFilterValues';
import { createQueryUrlFromObject, logError } from '../../../common/utils';
import { db, functions } from '../../../firebase';
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
      const getUser = httpsCallable(functions, FF_READ_PUBLIC_USER_DATA);

      const res = await getUser({ userID: userID });
      const data: any = res.data;

      if (!data.error) {
        const userObj = convertUserJsonToObj(data.userData, userID);
        // add to redux
        dispatch(sl_addUserToList({ [userID]: userObj }));
        setUserData(userObj);
      } else {
        throw Error(data.errorMessage);
      }
    } catch (e: any) {
      logError(e.message, e.stack, 'fetchUserData', 'ProfileGlance', {
        userID
      });
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in fetching user data. Please try again'
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
      className={`flex flex-col items-center text-center py-4 rounded-lg ${
        status === 'a' &&
        'hover:shadow-md border-skin-primary border-opacity-0 lg:hover:border-opacity-10 border-2'
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
      {!userData && (
        <ContentLoader
          width={200}
          height={200}
          viewBox='0 0 200 200'
          backgroundColor='#ddd6fe'
          foregroundColor='#ecebeb'
        >
          <circle cx='100' cy='50' r='38' />
          <rect x='55' y='100' rx='5' ry='5' width='90' height='15' />
          <rect x='55' y='120' rx='5' ry='5' width='90' height='15' />
          <rect x='55' y='140' rx='5' ry='5' width='90' height='15' />
        </ContentLoader>
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
