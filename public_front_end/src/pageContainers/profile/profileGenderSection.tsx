import { RadioGroup } from '@headlessui/react';
import React, { FC, useState } from 'react';
import { Icon } from '../../components';
import { Gender } from '../../models/enums';

type Props = {
  selected: Gender;
  updateSelected: Function;
  editMode: boolean;
};

const options = [
  {
    text: 'Female',
    value: Gender.Female,
    iconName: 'Female',
    subtext: 'Some nice description'
  },
  {
    text: 'Male',
    value: Gender.Male,
    iconName: 'Male',
    subtext: 'Some nice description'
  }
];

const ProfileGenderSection: FC<Props> = ({
  selected,
  updateSelected,
  editMode
}) => {
  return (
    <>
      <div className=''>
        {!editMode && <Icon iconName={selected.toString()} size='26' />}
        {editMode && (
          <RadioGroup value={selected} onChange={g => updateSelected(g)}>
            <RadioGroup.Label className='sr-only'>Gender</RadioGroup.Label>
            <div className='flex flex-row space-x-2'>
              {options.map(option => (
                <RadioGroup.Option
                  key={option.text}
                  value={option.value}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                        : ''
                    }
                  ${
                    checked
                      ? 'bg-skin-accent text-skin-primary'
                      : 'bg-skin-fill'
                  }
                    relative rounded-lg shadow-md px-2 py-1 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center'>
                          <div className='text-sm'>
                            <RadioGroup.Label
                              as='p'
                              className={`font-medium text-lg  ${
                                checked
                                  ? 'text-skin-inverted'
                                  : 'text-skin-primary'
                              }`}
                            >
                              {option.text}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as='span'
                              className={`inline ${
                                checked
                                  ? 'text-skin-inverted'
                                  : 'text-skin-primary'
                              }`}
                            >
                              {/* TODO think of some fun description */}
                              {/* {option.subtext} */}
                            </RadioGroup.Description>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}
      </div>
    </>
  );
};

export default ProfileGenderSection;
