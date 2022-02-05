import { collection, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, ImageComponent } from '../..';
import { FS_USER_DB } from '../../../common/constants';
import { FilterDBKeys, UserDBKeys } from '../../../common/dbKeys';
import { relationshipFilterValues } from '../../../common/staticFilterValues';
import { createQueryUrlFromObject } from '../../../common/utils';
import { db } from '../../../firebase';
import CircleUser from '../../../models/CircleUser';
import { app_sendToast } from '../../../redux/appCommon';
import { sl_addUserGiftSearchLink } from '../../../redux/simpleLists';
import { RootState, useAppDispatch } from '../../../redux/store';
import AppLink from '../AppLink';
import Button from '../Button';
import { getOptionFromValue } from '../ListBox/utils';

type Props = {
  data: CircleUser;
};

const ProfileGlance: FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userGiftingLinks = useSelector(
    (state: RootState) => state.simpleLists.userGiftSearchLink
  );

  const getUserSearchLink = async () => {
    try {
      setLoading(true);

      // check if present in redux
      if (userGiftingLinks[data.uid]) {
        setLoading(false);
        router.push(userGiftingLinks[data.uid]);
      }

      // fetch user data
      let res = await getDoc(doc(collection(db, FS_USER_DB), data.uid));

      if (res.exists()) {
        const id = res.id;
        const data = res.data();

        const searchUrl =
          '/search?' +
          createQueryUrlFromObject({
            [FilterDBKeys.interests]: data[UserDBKeys.interestedTags],
            [FilterDBKeys.gender]: data[UserDBKeys.gender]
          });

        // add to redux
        dispatch(sl_addUserGiftSearchLink({ [data.uid]: searchUrl }));
        router.push(searchUrl);
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

  return (
    <div className='flex flex-col items-center text-center  hover:shadow-xl p-4'>
      <Link href={`/profile/${data.uid}`}>
        <div className='cursor-pointer'>
          <div className='shadow-lg w-24 h-24 xl:w-32 xl:h-32 overflow-hidden border-4 rounded-full'>
            <ImageComponent
              src={'/images/person.jpg'}
              alt={data.name}
              width={120}
              height={120}
              layout='fixed'
            />
          </div>

          <Text
            content={data.name || ''}
            tag='h3'
            styleClasses='text-xl font-semibold'
          />
          <Text
            content={
              'My ' +
              getOptionFromValue(relationshipFilterValues, data.relation, '')
                .text
            }
            tag='h3'
            styleClasses='text-lg font-light'
          />
        </div>
      </Link>
      {userGiftingLinks[data.uid] && (
        <AppLink link={userGiftingLinks[data.uid]} text='Find Gifts' />
      )}
      {!userGiftingLinks[data.uid] && (
        <Button
          text={loading ? 'Searching Gifts' : 'Find Gifts'}
          defautStyle='cust-btn-link'
          onClick={getUserSearchLink}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProfileGlance;
