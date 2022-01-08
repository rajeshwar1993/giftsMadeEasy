import { Tab } from '@headlessui/react';
import React, { FC } from 'react';
import { classNames } from '../../common/utils';
import { Text } from '../../components';
import { Gender } from '../../models/enums';

import User from '../../models/User';
import BookmarksSection from './bookmakrs';
import ProfileAboutSection from './profileAboutSection';
import ProfileGenderSection from './profileGenderSection';
import ProfileImpDatesSection from './profileImpDates';
import ProfileInterestedInSection from './profileInteredtedInSection';
import WishListSection from './wishList';

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
        <Tab.Group>
          <Tab.List className='flex p-1 space-x-10 '>
            <Tab
              className={({ selected }) =>
                classNames(
                  'p-2.5 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                  selected ? 'border-opacity-100' : ''
                )
              }
            >
              <Text
                styleClasses='text-base xl:text-4xl font-light'
                content='Circle'
              />
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'p-2.5 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                  selected ? 'border-opacity-100' : ''
                )
              }
            >
              <Text
                styleClasses='text-base xl:text-4xl font-light'
                content='Wishlist'
              />
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'p-2.5 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                  selected ? 'border-opacity-100' : ''
                )
              }
            >
              <Text
                styleClasses='text-base xl:text-4xl font-light'
                content='Bookmarks'
              />
            </Tab>
          </Tab.List>
          <Tab.Panels className='mt-2'>
            <Tab.Panel
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              <ul>Circle</ul>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              <WishListSection />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              <BookmarksSection />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
