import React, { FC } from 'react';

import { Gender } from '../../models/enums';

import UserType from '../../models/User';
import CircleRequests from './circleRequests';
import CircleWishBookTabs from './circleWishBookTabs';
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

      <CircleRequests isMe={isMe} user={user} />

      <div className='mb-10'>
        <CircleWishBookTabs isMe={isMe} user={user} />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
