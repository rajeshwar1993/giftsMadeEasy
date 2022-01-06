import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import InterestTag from '../../../models/Interest';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FS_INTEREST_TAGS_DB } from '../../../models/constants';
import { InterestTagDBKeys } from '../../../common/dbKeys';
import {
  it_init_HierarchyArray,
  it_update_subInterestList
} from '../../../redux/interestTags';
import { Button, SectionTitle } from '../../../components';

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
  const { tagHierarchyList: hStoreArray } = useSelector(
    (state: RootState) => state.interests
  );
  const dispatch = useAppDispatch();

  const [selectedList, updateSelectedList] =
    useState<Array<string>>(selectedInts);

  const [chosenInterest, updateChosenInterest] = useState<{
    it: InterestTag;
    subInterests: Array<InterestTag>;
  } | null>(null);

  const fetchHierarchyInterestList = async () => {
    // get all the parent interests
    const instRef = collection(db, FS_INTEREST_TAGS_DB);
    const primaryDocQuery = query(
      instRef,
      where(InterestTagDBKeys.parentId, '==', '__PARENT__')
    );
    const snaps = await getDocs(primaryDocQuery);

    let hList: Array<{
      it: InterestTag;
      subInterests: Array<InterestTag>;
    }> = [];

    snaps.forEach(s => {
      hList.push({
        it: InterestTag.convertJsonToObj(s.data(), s.id),
        subInterests: []
      });
    });
    dispatch(it_init_HierarchyArray(hList));
  };

  const fetchSubInterests = async (parentId: string) => {
    // get all the parent interests
    const instRef = collection(db, FS_INTEREST_TAGS_DB);
    const primaryDocQuery = query(
      instRef,
      where(InterestTagDBKeys.parentId, '==', parentId)
    );
    const snaps = await getDocs(primaryDocQuery);

    let sList: Array<InterestTag> = [];

    snaps.forEach(s => {
      sList.push(InterestTag.convertJsonToObj(s.data(), s.id));
    });
    dispatch(it_update_subInterestList({ subInterests: sList, parentId }));
  };

  useEffect(() => {
    if (open) updateChosenInterest(null);

    if (hStoreArray.length === 0 && open) {
      fetchHierarchyInterestList();
    }
  }, [open]);

  useEffect(() => {
    if (!!chosenInterest && chosenInterest.subInterests.length === 0) {
      fetchSubInterests(chosenInterest.it.uid);
    }
  }, [chosenInterest]);

  useEffect(() => {
    if (!!chosenInterest) {
      const updatedChosenInterest = hStoreArray.find(
        hs => hs.it.uid === chosenInterest.it.uid
      );
      if (updatedChosenInterest) updateChosenInterest(updatedChosenInterest);
    }
  }, [hStoreArray]);

  useEffect(() => {
    updateSelectedList(selectedInts);
  }, [selectedInts, open]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={onClose}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-skin-accent bg-opacity-60' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='h-[600px] inline-block w-full max-w-lg p-4 xl:p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-skin-fill text-skin-primary shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='flex flex-row justify-between items-center leading-6'
              >
                <SectionTitle
                  content={
                    !chosenInterest
                      ? 'Select Interests'
                      : chosenInterest.it.value
                  }
                  styleClasses='text-2xl xl:text-5xl'
                  wrapperClasses='!mb-0'
                />
                <div className='flex'>
                  <Button
                    icon={{
                      iconName: 'Close',
                      size: '16'
                    }}
                    defautStyle='cust-btn-btn'
                    onClick={() => {
                      onClose();
                    }}
                    styleClasses='text-lg !rounded-full !py-2 !px-2'
                    wrapperClasses='mx-2'
                  />
                  <Button
                    icon={{
                      iconName: 'Check',
                      size: '16'
                    }}
                    defautStyle='cust-btn-btn'
                    onClick={() => {
                      onSave(selectedList);
                      onClose();
                    }}
                    styleClasses='text-lg !rounded-full !py-2 !px-2'
                    wrapperClasses='mx-2'
                  />
                </div>
              </Dialog.Title>
              <div className='m-2 flex flex-col'>
                {/* Main Options */}

                <div
                  className={`grid grid-cols-2 gap-y-8 gap-x-2 xl:gap-x-8 mt-12 ${
                    !!chosenInterest ? 'hidden' : ''
                  }`}
                >
                  {hStoreArray.map(th => (
                    <Button
                      key={th.it.uid}
                      text={th.it.value}
                      defautStyle='cust-btn-btn'
                      styleClasses='w-full justify-center'
                      wrapperClasses=''
                      onClick={() => updateChosenInterest(th)}
                    />
                  ))}
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
                  <div className='px-4 grid grid-cols-2 gap-y-8 gap-x-2 xl:gap-x-8 mt-12'>
                    {!!chosenInterest && (
                      <Button
                        text={`Select All ${chosenInterest!.it.value}`}
                        defautStyle='cust-btn-btn'
                        wrapperClasses='col-span-2 m-auto'
                        styleClasses={` ${
                          selectedList.includes(chosenInterest!.it.uid)
                            ? 'bg-skin-accent bg-opacity-80 text-skin-inverted'
                            : ''
                        } `}
                        onClick={() => {
                          console.log('Clicking');
                          if (selectedList.includes(chosenInterest!.it.uid)) {
                            updateSelectedList(state =>
                              state.filter(s => s !== chosenInterest!.it.uid)
                            );
                          } else {
                            updateSelectedList([
                              ...selectedList,
                              chosenInterest!.it.uid
                            ]);
                          }
                        }}
                      />
                    )}
                    {!!chosenInterest &&
                      chosenInterest.subInterests.map(si => {
                        let hasBeenSelected =
                          selectedList.includes(si.uid) ||
                          selectedList.includes(si.parentId);
                        return (
                          <Button
                            key={si.uid}
                            text={si.value}
                            defautStyle='cust-btn-btn'
                            styleClasses={`w-full justify-center ${
                              hasBeenSelected
                                ? 'bg-skin-accent bg-opacity-80 text-skin-inverted'
                                : ''
                            } `}
                            onClick={() => {
                              console.log('Clicking');
                              if (hasBeenSelected) {
                                updateSelectedList(state =>
                                  state.filter(s => s !== si.uid)
                                );
                              } else {
                                updateSelectedList([...selectedList, si.uid]);
                              }
                            }}
                          />
                        );
                      })}
                  </div>
                  {/* <div className='mt-6 flex flex-col'>
                   
                  </div> */}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectInterestsPopup;
