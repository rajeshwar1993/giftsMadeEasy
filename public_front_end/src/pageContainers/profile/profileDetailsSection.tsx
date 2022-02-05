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
  updateInterestTags: (tags: Array<string>) => void;
  isMe: boolean;
};

const ProfileDetailsSection: FC<Props> = ({
  user,
  updateInterestTags,
  isMe
}) => {
  return (
    <div className='flex flex-col space-y-8'>
      {/* Likes */}
      <ProfileInterestedInSection
        ints={user.interestedTags}
        user={user}
        onSaveClick={(tags: Array<string>) => {
          updateInterestTags(tags);
        }}
        isMe={isMe}
      />

      <div className='mb-10'>
        <CircleWishBookTabs isMe={isMe} user={user} />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
