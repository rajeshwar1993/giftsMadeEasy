import { getDoc, doc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, SectionTitle, Text } from '../../components';
import Chip from '../../components/Reusable/Chip';
import SelectInterestsPopup from '../../components/Reusable/SelectInterestsPopup';

import { db } from '../../firebase';
import { FS_INTEREST_TAGS_DB } from '../../common/constants';
import InterestTagType, { convertITJsonToObj } from '../../models/Interest';
import { it_add_tagArray } from '../../redux/interestTags';
import { RootState, useAppDispatch } from '../../redux/store';
import OKCancelBtn from '../../components/Reusable/OKCancelBtn';
import { interestFilterValues } from '../../common/staticFilterValues';

type Props = {
  ints: Array<string>;
  onSaveClick: (tags: Array<string>) => void;
  isMe: boolean;
};

const ProfileInterestedInSection: FC<Props> = ({
  ints = [],
  onSaveClick,
  isMe
}) => {
  const [editMode, toggleEditMode] = useState(false);
  const [tempIntArray, updateTempIntArray] = useState<Array<string>>(ints);
  const [popupOpen, updatePopupOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   // set variables for edit mode
  //   updateTempIntArray(ints);
  // }, [editMode]);

  return (
    <div>
      <div className='flex flex-row justify-between xl:justify-start xl:space-x-6 items-start'>
        <SectionTitle content='Interested In' />
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
              styleClasses='!rounded-full !py-2 !px-2'
              wrapperClasses='mx-2'
            />
          )}
          {editMode && (
            <OKCancelBtn
              onClose={() => {
                toggleEditMode(false);
              }}
              onSave={() => {
                toggleEditMode(false);
                onSaveClick(tempIntArray);
              }}
            />
          )}
        </div>
      </div>

      <div>
        {!editMode && ints.length === 0 && (
          <Text
            content={
              'Add some interest tags to let your circle know what you like ...'
            }
            tag='h3'
            styleClasses='text-xl'
          />
        )}
        {editMode && (
          <div className='mb-4'>
            <Button
              text='Add Interests'
              onClick={() => {
                updatePopupOpen(true);
              }}
              defautStyle='cust-btn-btn'
              icon={{
                iconName: 'Add'
              }}
            />
          </div>
        )}

        <div className='flex flex-wrap'>
          {tempIntArray.map(int => (
            <Chip
              key={int}
              editMode={editMode}
              onCancel={id => {
                updateTempIntArray(state => state.filter(item => item !== id));
              }}
              id={int}
              text={{
                content: interestFilterValues.get(int)?.name || ''
              }}
            />
          ))}
        </div>
        {!editMode && (
          <Button
            text='Find Gifts for Aditya Vikram Chatterjee'
            link={'/search'}
            defautStyle='cust-btn-link'
            styleClasses='text-sm'
          />
        )}
      </div>

      <SelectInterestsPopup
        open={popupOpen}
        selectedInts={tempIntArray.map(i => i)}
        onClose={() => updatePopupOpen(false)}
        onSave={newTagsList => {
          onSaveClick(newTagsList);
          updateTempIntArray(newTagsList);
          toggleEditMode(false);
        }}
      />
    </div>
  );
};

export default ProfileInterestedInSection;
