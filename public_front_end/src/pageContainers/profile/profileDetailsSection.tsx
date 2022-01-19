import React, { FC } from 'react';

import { Gender } from '../../models/enums';

import UserType from '../../models/User';
import CircleWishBookTabs from './circleWishBookTabs';
import ProfileAboutSection from './profileAboutSection';
import ProfileGenderSection from './profileGenderSection';
import ProfileImpDatesSection from './profileImpDates';
import ProfileInterestedInSection from './profileInteredtedInSection';

type Props = {
  user: UserType;
  updateAboutText: (text: string) => void;
  updateDates: (dob: string, relDate: string) => void;
  updateInterestTags: (tags: Array<string>) => void;
  updateGender: (g: Gender) => void;
  isMe: boolean;
};

const ProfileDetailsSection: FC<Props> = ({
  user,
  updateAboutText,
  updateDates,
  updateInterestTags,
  updateGender,
  isMe
}) => {
  return (
    <div>
      {/* Likes */}
      <ProfileInterestedInSection
        ints={user.interestedTags}
        onSaveClick={(tags: Array<string>) => {
          updateInterestTags(tags);
        }}
        isMe={isMe}
      />

      <div className='mb-10'>
        <CircleWishBookTabs isMe={isMe} />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
