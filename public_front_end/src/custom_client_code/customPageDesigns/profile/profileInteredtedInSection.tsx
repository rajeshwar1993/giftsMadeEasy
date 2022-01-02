import React, { FC, useState } from 'react';

import AllComponents from '../../../core_custom_mixer/components';
import Badge from '../../component_overrides/Bagde';

const { Text, SectionTitle, Button } = AllComponents;

type Props = {
  ints: Array<{
    id: string;
    text: string;
  }>;
  onSaveClick: Function;
};

const ProfileInterestedInSection: FC<Props> = ({ ints = [], onSaveClick }) => {
  const [editMode, toggleEditMode] = useState(false);
  const [intArray, updateIntArray] = useState(ints);

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <SectionTitle content='Interested In' />
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
                  onSaveClick();
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
          <>
            <div className='mb-2'>
              {intArray.map(int => (
                <Badge
                  key={int.id}
                  text={{
                    content: int.text
                  }}
                />
              ))}
            </div>
            <Button
              text='Find Gifts for Aditya Vikram Chatterjee'
              link={'/search'}
              defautStyle='cust-btn-link'
            />
          </>
        )}
        {editMode && <div></div>}
      </div>
    </div>
  );
};

export default ProfileInterestedInSection;
