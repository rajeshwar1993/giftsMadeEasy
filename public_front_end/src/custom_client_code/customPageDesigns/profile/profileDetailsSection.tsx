import React, { FC } from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import User from '../../../models/User';
import Badge from '../../component_overrides/Bagde';
import BookmarksSection from './bookmakrs';
import ProfileAboutSection from './profileAboutSection';
import ProfileImpDatesSection from './profileImpDates';
import ProfileInterestedInSection from './profileInteredtedInSection';
import WishListSection from './wishList';

const { Button, SectionTitle } = AllComponents;

type Props = {
  user: User;
  updateAboutText: (text: string) => void;
  updateDates: (dob: string, relDate: string) => void;
  updateInterestTags: (tags: Array<string>) => void;
};

const ProfileDetailsSection: FC<Props> = ({
  user,
  updateAboutText,
  updateDates
}) => {
  return (
    <div>
      {/* About Section */}
      <ProfileAboutSection
        text={user.aboutText}
        onSaveClick={(t: string) => {
          updateAboutText(t);
        }}
      />
      {/* Likes */}
      <ProfileInterestedInSection
        ints={user.interestedTags}
        onSaveClick={(tags: Array<string>) => {
          console.log(tags);
        }}
      />
      <div className='mb-10'>
        <ProfileImpDatesSection
          dob={user.dob}
          relDate={user.relDate}
          onSaveClick={(dob: string, relDate: string) => {
            console.log(dob, relDate);
            updateDates(dob, relDate);
          }}
        />
      </div>
      <div className='mb-10'>
        <WishListSection />
      </div>
      <div className='mb-10'>
        <BookmarksSection />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
