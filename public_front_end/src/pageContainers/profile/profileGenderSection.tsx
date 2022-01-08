import { RadioGroup } from '@headlessui/react';
import React, { FC, useState } from 'react';
import { Button, Icon, SectionTitle, Text } from '../../components';
import { Gender } from '../../models/enums';

type Props = {
  gender: Gender;
  onSaveClick: (g: Gender) => void;
  isMe: boolean;
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

const ProfileGenderSection: FC<Props> = ({ gender, onSaveClick, isMe }) => {
  const [editMode, toggleEditMode] = useState(false);
  const [selected, updateSelected] = useState<Gender>(gender);

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <SectionTitle content='Gender' />
        <div>
          {!editMode && isMe && (
            <Button
              icon={{
                iconName: 'Pencil'
              }}
              defautStyle='cust-btn-btn'
              onClick={() => {
                toggleEditMode(true);
              }}
              styleClasses='text-lg !rounded-full !py-2 !px-2'
              wrapperClasses='mx-2'
            />
          )}
          {editMode && (
            <div className='flex'>
              <Button
                icon={{
                  iconName: 'Close'
                }}
                defautStyle='cust-btn-btn'
                onClick={() => {
                  toggleEditMode(false);
                  updateSelected(gender);
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2'
              />
              <Button
                icon={{
                  iconName: 'Check'
                }}
                defautStyle='cust-btn-btn'
                onClick={() => {
                  toggleEditMode(false);
                  onSaveClick(selected);
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2'
              />
            </div>
          )}
        </div>
      </div>

      <div className='mb-10'>
        {!editMode && (
          <div className='flex flex-row'>
            <div className='flex flex-col justify-center items-center pr-10'>
              <Icon iconName={selected.toString()} size='80' />
              <Text content={selected.toString()} styleClasses='text-xl' />
            </div>
          </div>
        )}
        {editMode && (
          <RadioGroup value={selected} onChange={updateSelected}>
            <RadioGroup.Label className='sr-only'>Gender</RadioGroup.Label>
            <div className='flex flex-col  xl:flex-row space-y-2 xl:space-x-2'>
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
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
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
    </div>
  );
};

export default ProfileGenderSection;
