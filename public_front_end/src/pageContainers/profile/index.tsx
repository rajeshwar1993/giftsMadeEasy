import { collection, doc, increment, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

import { auth, db } from '../../firebase';
import { UserDBKeys } from '../../common/dbKeys';
import { FS_USER_DB } from '../../common/constants';
import UserType from '../../models/User';
import { useAppDispatch } from '../../redux/store';
import { ur_updateUser } from '../../redux/user';
import ProfileImageSection from './profileImageSection';
import ProfileDetailsSection from './profileDetailsSection';
import { Gender } from '../../models/enums';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logError } from '../../common/utils';
import { useRouter } from 'next/router';

type Props = {
  user: UserType;
};

const ProfilePage: FC<Props> = ({ user }) => {
  const fbAuth = useAuthState(auth);
  const router = useRouter();
  const [isMe, updateIsMe] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.uid === fbAuth[0]?.uid) {
      updateIsMe(true);
    } else {
      updateIsMe(false);
    }
  }, [user, fbAuth]);

  const updateAboutText = async (text: string) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.aboutText]: text
      });
      dispatch(ur_updateUser({ key: UserDBKeys.aboutText, value: text }));
    } catch (e: any) {
      logError(e.message, e.stack, 'updateAboutText', 'ProfilePage', {
        text,
        userID: user.uid
      });
    }
  };

  const updateGender = async (g: Gender) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.gender]: g.toString()
      });
      dispatch(ur_updateUser({ key: UserDBKeys.gender, value: g.toString() }));
    } catch (e: any) {
      logError(e.message, e.stack, 'updateGender', 'ProfilePage', {
        g,
        userID: user.uid
      });
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
    } catch (e: any) {
      logError(e.message, e.stack, 'updateDates', 'ProfilePage', {
        dob,
        relDate,
        userID: user.uid
      });
    }
  };

  const saveProfileImgUrl = async (url: string) => {
    try {
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.imgUrl]: url
      });
      dispatch(ur_updateUser({ key: UserDBKeys.imgUrl, value: url }));
    } catch (e: any) {
      logError(e.message, e.stack, 'saveProfileImgUrl', 'ProfilePage', {
        url,
        userID: user.uid
      });
    }
  };

  const updateInterestTags = async (updatedTags: Array<string>) => {
    try {
      // TODO - do thorough testing around this functionality (integration testing)

      // update user tags
      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, user.uid), {
        [UserDBKeys.interestedTags]: updatedTags
      });

      dispatch(
        ur_updateUser({ key: UserDBKeys.interestedTags, value: updatedTags })
      );

      // update the tag counts in db - not needed, we are removing interest tag db for now
      // let promises: any[] = [];
      // const tagRef = collection(db, FS_INTEREST_TAGS_DB);
      // tagsToRemove.forEach(t => {
      //   promises.push(
      //     updateDoc(doc(tagRef, t), {
      //       [InterestTagDBKeys.userCount]: increment(-1)
      //     })
      //   );
      // });

      // tagsToAdd.map(t => {
      //   promises.push(
      //     updateDoc(doc(tagRef, t), {
      //       [InterestTagDBKeys.userCount]: increment(1)
      //     })
      //   );
      // });

      // await Promise.all(promises);
    } catch (e: any) {
      logError(e.message, e.stack, 'updateInterestTags', 'ProfilePage', {
        updatedTags,
        userID: user.uid
      });
    }
  };

  return (
    <section>
      <div className='flex flex-col md:flex-row'>
        {/* left section */}
        <div className=' md:w-1/4 w-full'>
          <ProfileImageSection
            user={user}
            saveImgUrl={saveProfileImgUrl}
            isMe={isMe}
            updateAboutText={updateAboutText}
            updateDates={updateDates}
            updateGender={updateGender}
          />
        </div>
        {/* right section */}
        <div className='md:w-3/4 md:pl-16'>
          <ProfileDetailsSection
            user={user}
            updateInterestTags={updateInterestTags}
            isMe={isMe}
            defaultTab={router.query.tab}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
