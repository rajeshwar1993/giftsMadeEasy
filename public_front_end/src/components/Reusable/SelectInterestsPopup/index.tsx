import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import InterestTagType, { convertITJsonToObj } from '../../../models/Interest';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FS_INTEREST_TAGS_DB } from '../../../common/constants';
import { InterestTagDBKeys, ProductDBKeys } from '../../../common/dbKeys';
import {
  it_init_HierarchyArray,
  it_update_subInterestList
} from '../../../redux/interestTags';
import { Button, SectionTitle } from '../../../components';
import DialogContainer from '../DialogContainer';
import OKCancelBtn from '../OKCancelBtn';
import {
  interestFilterValues,
  interestGroupMap
} from '../../../common/staticFilterValues';
import CheckBoxGroup, { CheckListOption } from '../CheckBoxGroup';
import DataConfig from '../../../common/componentConfig';

type Props = {
  open: boolean;
  selectedInts: Array<string>;
  onSave: (tags: Array<string>) => void;
  onClose: () => void;
};

const SelectInterestsPopup: FC<Props> = ({
  open,
  selectedInts,
  onSave,
  onClose
}) => {
  let currentGroupInterests: Array<string> = [];

  const [selectedList, updateSelectedList] =
    useState<Array<string>>(selectedInts);

  const [chosenInterest, updateChosenInterest] = useState<number | null>();

  useEffect(() => {
    if (open) updateChosenInterest(null);
  }, [open]);

  useEffect(() => {
    updateSelectedList(selectedInts);
  }, [selectedInts, open]);

  const createGroupButtons = () => {
    let groupButtons: any = [];

    interestGroupMap.forEach((val, key) => {
      groupButtons.push(
        <Button
          icon={{
            iconName: 'ArrowForward'
          }}
          iconPos='after'
          key={key}
          text={val}
          defautStyle='cust-btn-link'
          styleClasses='w-fit'
          wrapperClasses=''
          onClick={() => updateChosenInterest(key)}
        />
      );
    });

    return groupButtons;
  };

  const showInterestOptions = (chosenInterest: number) => {
    let interestOptions: Array<CheckListOption> = [];
    currentGroupInterests = [];
    interestFilterValues.forEach((value, key) => {
      if (value.parent === chosenInterest) {
        currentGroupInterests.push(key);
        interestOptions.push({ text: value.name, value: key });
      }
    });

    return (
      <CheckBoxGroup
        filterKey={ProductDBKeys.interestTags}
        checkList={interestOptions}
        selected={selectedList}
        gridOverride={''}
        onChangeHandler={(
          filterKey,
          updatedValues,
          currentValue,
          isChecked
        ) => {
          if (currentValue === 'SELECT_ALL') {
            if (isChecked) {
              let all = [...selectedList, ...updatedValues];
              let s = new Set(all);
              updateSelectedList(Array.from(s));
            } else {
              let s = new Set(selectedList);
              currentGroupInterests.forEach(cgi => {
                s.delete(cgi);
              });
              updateSelectedList(Array.from(s));
            }
          } else {
            updateSelectedList(list => {
              if (isChecked) {
                return [...list, currentValue];
              } else {
                let newList = list.filter(l => l !== currentValue);
                return newList;
              }
            });
          }
        }}
        showSelectAll
      />
    );
  };

  return (
    <DialogContainer open={open} closeModal={onClose}>
      <div className='min-h-[500px]'>
        <Dialog.Title className='flex flex-row justify-between items-center leading-6'>
          <SectionTitle
            content={
              !chosenInterest
                ? 'Select Interests'
                : interestGroupMap.get(chosenInterest) || ''
            }
            styleClasses='text-2xl xl:text-5xl'
            wrapperClasses='!mb-0'
          />

          <OKCancelBtn
            onSave={() => {
              onSave(selectedList);
              onClose();
            }}
            onClose={() => {
              onClose();
            }}
          />
        </Dialog.Title>
        <div className='m-2 flex flex-col'>
          {/* Main Options */}

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-2 xl:gap-x-8 mt-12 ${
              !!chosenInterest ? 'hidden' : ''
            }`}
          >
            {createGroupButtons()}
          </div>

          {/* Sub Interests */}

          <div className={`${!chosenInterest && 'hidden'}`}>
            <Button
              icon={{
                iconName: 'ArrowBack'
              }}
              text={'Back to All Interests'}
              styleClasses='text-sm'
              defautStyle='cust-btn-link'
              onClick={() => updateChosenInterest(null)}
            />
            <div className='mt-12'>
              {!!chosenInterest && showInterestOptions(chosenInterest)}
            </div>
          </div>
        </div>
      </div>
    </DialogContainer>
  );
};

export default SelectInterestsPopup;
