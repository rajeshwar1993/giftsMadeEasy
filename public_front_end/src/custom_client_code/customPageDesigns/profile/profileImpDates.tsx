import React, { FC, useState } from 'react';

import AllComponents from '../../../core_custom_mixer/components';

const { Text, SectionTitle, Button, Icon } = AllComponents;

type Props = {
  text: string;
  onSaveClick: Function;
};

const ProfileImpDatesSection: FC<Props> = ({ text, onSaveClick }) => {
  const [editMode, toggleEditMode] = useState(false);
  const [aboutText, updateAboutText] = useState(text);

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <SectionTitle content='Dates' />
        <div>
          {!editMode && (
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
                  onSaveClick(aboutText);
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
              <Icon iconName='Cake' size='80' />
              <Text content='August 18th' styleClasses='text-xl' />
              <Button
                text='Find Birthday Gifts'
                link={'/search'}
                styleClasses='text-sm'
                defautStyle='cust-btn-link'
              />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Icon iconName='OutlineFavorite' size='80' />
              <Text content='May 18th' styleClasses='text-xl' />
              <Button
                text='Find Anniversary Gifts'
                link={'/search'}
                styleClasses='text-sm'
                defautStyle='cust-btn-link'
              />
            </div>
          </div>
        )}
        {editMode && (
          <div className='flex flex-col xl:flex-row'>
            <div className='flex flex-col mb-6 xl:w-1/3 xl:mr-14'>
              <Text content='Birthday' styleClasses='font-semibold text-lg' />
              <input
                type={'date'}
                className='mt-2 border-2 border-skin-accent rounded-lg'
              />
              <Text
                content='The Year is not displayed on profile.'
                styleClasses='font-semibold text-sm'
              />
            </div>
            <div className='flex flex-col mb-6 xl:w-1/3'>
              <Text
                content='Relationship'
                styleClasses='font-semibold text-lg'
              />
              <input
                type={'date'}
                className='mt-2 border-2 border-skin-accent rounded-lg'
              />
              <Text
                content='The Year is not displayed on profile.'
                styleClasses='font-semibold text-sm'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImpDatesSection;
