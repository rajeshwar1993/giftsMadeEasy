import React, { FC } from 'react';

import { Gender } from '../../models/enums';

import User from '../../models/User';
import CircleWishBookTabs from './circleWishBookTabs';
import ProfileAboutSection from './profileAboutSection';
import ProfileGenderSection from './profileGenderSection';
import ProfileImpDatesSection from './profileImpDates';
import ProfileInterestedInSection from './profileInteredtedInSection';

type Props = {
  user: User;
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
      {/* About Section */}
      <ProfileAboutSection
        text={user.aboutText}
        onSaveClick={(t: string) => {
          updateAboutText(t);
        }}
        isMe={isMe}
      />
      {/* Likes */}
      <ProfileInterestedInSection
        ints={user.interestedTags}
        onSaveClick={(tags: Array<string>) => {
          updateInterestTags(tags);
        }}
        isMe={isMe}
      />
      <div className='flex flex-col xl:flex-row justify-between mb-10'>
        <div className='xl:mr-40 xl:min-w-[520px]'>
          <ProfileImpDatesSection
            dob={user.dob}
            relDate={user.relDate}
            onSaveClick={(dob: string, relDate: string) => {
              console.log(dob, relDate);
              updateDates(dob, relDate);
            }}
            isMe={isMe}
          />
        </div>
        <div className='xl:min-w-[320px]'>
          <ProfileGenderSection
            gender={user.gender}
            onSaveClick={updateGender}
            isMe={isMe}
          />
        </div>
      </div>
      <div className='mb-10'>
        <CircleWishBookTabs />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
