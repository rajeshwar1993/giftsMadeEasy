import { getDoc, doc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AllComponents from '../../../core_custom_mixer/components';
import { db } from '../../../firebase';
import { FS_INTEREST_TAGS_DB } from '../../../models/constants';
import InterestTag from '../../../models/Interest';
import { it_add_tagArray } from '../../../redux/interestTags';
import { RootState, useAppDispatch } from '../../../redux/store';
import Badge from '../../component_overrides/Bagde';
import SelectInterestsPopup from '../../component_overrides/SelectInterestsPopup';

const { Text, SectionTitle, Button } = AllComponents;

type Props = {
  ints: Array<string>;
  onSaveClick: (tags: Array<string>) => void;
};

const ProfileInterestedInSection: FC<Props> = ({ ints = [], onSaveClick }) => {
  const [editMode, toggleEditMode] = useState(false);
  const [intArray, updateIntArray] = useState<Array<InterestTag>>([]);
  const [tempIntArray, updateTempIntArray] = useState<Array<InterestTag>>([]);
  const [popupOpen, updatePopupOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const interestArray = useSelector(
    (state: RootState) => state.interests.tagArray
  );

  const fetchAndUpdateInterests = async (userInterests: Array<string>) => {
    // ! POTENTIAL_ISSUE - revisit this logic, might get complicated if interests become too large

    let finalList: Array<InterestTag> = [];
    let fetchedList: Array<InterestTag> = [];

    // check which intestest already present in store
    let interestsToFetch = userInterests.filter(it => {
      const seekIntrest = interestArray.find(i => i.uid === it);
      if (seekIntrest) {
        finalList.push(seekIntrest);
        return false;
      }
      return true;
    });

    // ! POTENTIAL_ISSUE - aggregating too many promises might me an issue
    const readPromises = interestsToFetch.map(it => {
      console.log('Fetching interest: ', it);
      return getDoc(doc(db, FS_INTEREST_TAGS_DB, it));
    });

    const allSnaps = await Promise.all(readPromises);
    allSnaps.forEach(interestSnap => {
      if (interestSnap.exists()) {
        const intestest = InterestTag.convertJsonToObj(
          interestSnap.data(),
          interestSnap.id
        );
        fetchedList.push(intestest);
      }
    });
    dispatch(it_add_tagArray(fetchedList));
    updateIntArray([...finalList, ...fetchedList]);
  };

  useEffect(() => {
    fetchAndUpdateInterests(ints);
  }, [ints]);

  useEffect(() => {
    // set variables for edit mode
    updateTempIntArray(intArray);
  }, [editMode]);

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
            <div className='flex '>
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
                  let finalInts = tempIntArray.map(i => i.uid);
                  fetchAndUpdateInterests(finalInts);
                  onSaveClick(finalInts);
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2'
              />
            </div>
          )}
        </div>
      </div>

      <div className='mb-10'>
        {!editMode && intArray.length === 0 && (
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

        <div className='mb-2 flex flex-wrap'>
          {(editMode ? tempIntArray : intArray).map(int => (
            <Badge
              key={int.uid}
              editMode={editMode}
              onCancel={id => {
                updateTempIntArray(state =>
                  state.filter(item => item.uid !== id)
                );
              }}
              id={int.uid}
              text={{
                content:
                  int.parentId === '__PARENT__' ? `All ${int.value}` : int.value
              }}
            />
          ))}
        </div>
        {!editMode && (
          <Button
            text='Find Gifts for Aditya Vikram Chatterjee'
            link={'/search'}
            defautStyle='cust-btn-link'
          />
        )}
      </div>

      <SelectInterestsPopup
        open={popupOpen}
        selectedInts={tempIntArray.map(i => i.uid)}
        onClose={() => updatePopupOpen(false)}
        onSave={newTagsList => {
          onSaveClick(newTagsList);
          fetchAndUpdateInterests(newTagsList);
          toggleEditMode(false);
        }}
      />
    </div>
  );
};

export default ProfileInterestedInSection;
