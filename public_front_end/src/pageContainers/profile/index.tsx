import { collection, doc, increment, updateDoc } from 'firebase/firestore';
import React, { FC, useRef } from 'react';

import { db } from '../../firebase';
import { InterestTagDBKeys, UserDBKeys } from '../../common/dbKeys';
import { FS_INTEREST_TAGS_DB, FS_USER_DB } from '../../models/constants';
import User from '../../models/User';
import { useAppDispatch } from '../../redux/store';
import { ur_updateUser } from '../../redux/user';
import ProfileImageSection from './profileImageSection';
import ProfileDetailsSection from './profileDetailsSection';
import { Gender } from '../../models/enums';

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

  const updateGender = async (g: Gender) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.gender]: g.toString()
      });
      dispatch(ur_updateUser({ key: UserDBKeys.gender, value: g.toString() }));
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

  const saveProfileImgUrl = async (url: string) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.imgUrl]: url
      });
      dispatch(ur_updateUser({ key: UserDBKeys.imgUrl, value: url }));
    } catch (e) {
      console.log(e);
      // TODO handle error properly
    }
  };

  const updateInterestTags = async (updatedTags: Array<string>) => {
    try {
      // TODO - do thorough testing around this functionality (integration testing)
      const ogTags = [...user.interestedTags];
      console.log('From Index', updatedTags);

      // used to update the count
      let tagsToRemove = ogTags.filter(t => !updatedTags.includes(t));
      let tagsToAdd = updatedTags.filter(t => !ogTags.includes(t));

      // update user tags
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.interestedTags]: updatedTags
      });

      dispatch(
        ur_updateUser({ key: UserDBKeys.interestedTags, value: updatedTags })
      );

      // TODO - make this count update happen as part of cloud functions on change in tags
      // update the tag counts in db
      let promises: any[] = [];
      const tagRef = collection(db, FS_INTEREST_TAGS_DB);
      tagsToRemove.forEach(t => {
        promises.push(
          updateDoc(doc(tagRef, t), {
            [InterestTagDBKeys.userCount]: increment(-1)
          })
        );
      });

      tagsToAdd.map(t => {
        promises.push(
          updateDoc(doc(tagRef, t), {
            [InterestTagDBKeys.userCount]: increment(1)
          })
        );
      });

      await Promise.all(promises);
    } catch (e) {
      console.log(e);
      // TODO handle error properly
    }
  };

  return (
    <section>
      <div className='flex flex-col xl:flex-row'>
        {/* left section */}
        <div className=' xl:w-1/5 w-full'>
          <ProfileImageSection
            uid={user.uid}
            name={user.name}
            imgUrl={user.imgUrl}
            saveImgUrl={saveProfileImgUrl}
          />
        </div>
        {/* right section */}
        <div className='xl:w-4/5 xl:pl-16'>
          <ProfileDetailsSection
            user={user}
            updateAboutText={updateAboutText}
            updateDates={updateDates}
            updateInterestTags={updateInterestTags}
            updateGender={updateGender}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
