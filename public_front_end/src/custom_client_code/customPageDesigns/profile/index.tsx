import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { FC } from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import { db } from '../../../firebase';
import { UserDBKeys } from '../../../helpers/dbKeys';
import { FS_USER_DB } from '../../../models/constants';
import InterestTag from '../../../models/Interest';
import User from '../../../models/User';
import { useAppDispatch } from '../../../redux/store';
import { ur_updateUser } from '../../../redux/user';
import ProfileDetailsSection from './profileDetailsSection';
import ProfileImageSection from './profileImageSection';

const { ImageComponent, Text, Button } = AllComponents;

type Props = {
  user: User;
};

const ProfilePage: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const updateAboutText = async (text: string) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.aboutText]: text
      });
      dispatch(ur_updateUser({ key: UserDBKeys.aboutText, value: text }));
    } catch (e) {
      console.log(e);
      // TODO handle error properly
    }
  };

  const updateDates = async (dob: string, relDate: string) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.dob]: dob,
        [UserDBKeys.relDate]: relDate
      });
      dispatch(ur_updateUser({ key: UserDBKeys.dob, value: dob }));
      dispatch(ur_updateUser({ key: UserDBKeys.relDate, value: relDate }));
    } catch (e) {
      console.log(e);
      // TODO handle error properly
    }
  };

  const updateInterestTags = async (tags: Array<string>) => {
    // TODO - do thorough testing around this functionality (integration testing)
  };

  return (
    <section>
      <div className='flex flex-col xl:flex-row'>
        {/* left section */}
        <div className=' xl:w-1/5 w-full'>
          <ProfileImageSection />
        </div>
        {/* right section */}
        <div className='xl:w-4/5 xl:pl-16'>
          <ProfileDetailsSection
            user={user}
            updateAboutText={updateAboutText}
            updateDates={updateDates}
            updateInterestTags={updateInterestTags}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
