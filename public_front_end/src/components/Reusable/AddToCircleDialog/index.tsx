import React, { FC, Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import User from '../../../models/User';
import { createListboxOptions, DEFAULT_LIST_VALUE } from '../ListBox/utils';
import SectionTitle from '../SectionTitle';
import Button from '../Button';
import ImageComponent from '../ImageComponent';
import Text from '../Text';
import ListBoxComp from '../ListBox';
import {
  CircleUserDBKeys,
  FilterDBKeys,
  UserDBKeys
} from '../../../common/dbKeys';
import DataConfig from '../../../common/componentConfig';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { FS_USER_DB, FS_USER_MYCIRCLE_DB } from '../../../models/constants';
import CircleUser from '../../../models/CircleUser';
import { useAppDispatch } from '../../../redux/store';
import { cu_addUser } from '../../../redux/myCircleList';

type AddToCircleDialogProps = {
  open: boolean;
  onClose: () => void;
  modalUserFromParent?: User | null;
  currentUser: User | null;
  isPresentInCircle: boolean;
  circleUserIds?: Array<string>;
};

const AddToCircleDialog: FC<AddToCircleDialogProps> = ({
  open,
  onClose,
  currentUser: user,
  circleUserIds,
  modalUserFromParent = null,
  isPresentInCircle
}) => {
  const dispatch = useAppDispatch();

  const [relVal, setRelVal] = useState({
    name: 'Relationship',
    value: DEFAULT_LIST_VALUE
  });

  const [userAlreadyinCircle, setUserAlreadyinCircle] =
    useState(isPresentInCircle);

  const [modalUser, setModalUser] = useState<User | null>(modalUserFromParent);

  const searchUser = async (itendifier: string) => {
    // check if me, then return
    if (user?.email === itendifier) return;

    // logic to find user by email
    // TODO add logic to find by phone number
    let foundUser: User;
    const userRef = collection(db, FS_USER_DB);
    const primaryDocQuery = query(
      userRef,
      where(UserDBKeys.email, '==', itendifier)
    );
    const snaps = await getDocs(primaryDocQuery);

    if (!snaps.empty) {
      foundUser = User.convertJsonToObj(snaps.docs[0].data(), snaps.docs[0].id);
      setModalUser(foundUser);
    } else {
      setModalUser(null);
    }
  };

  const addUserToCircle = async (userToAdd: User, rel: string) => {
    try {
      // logic to add userToAdd to current user's circle

      let cu = CircleUser.convertJsonToObj(
        {
          [CircleUserDBKeys.name]: userToAdd.name,
          [CircleUserDBKeys.imgUrl]: userToAdd.imgUrl,
          [CircleUserDBKeys.relation]: rel
        },
        userToAdd.uid
      );

      let col = collection(
        db,
        `${FS_USER_DB}/${user?.uid}/${FS_USER_MYCIRCLE_DB}`
      );
      await setDoc(doc(col, userToAdd.uid), {
        [CircleUserDBKeys.name]: userToAdd.name,
        [CircleUserDBKeys.imgUrl]: userToAdd.imgUrl,
        [CircleUserDBKeys.relation]: rel
      });

      dispatch(cu_addUser(cu));

      closeModal();
    } catch (e) {
      console.log(e);
      // TODO handle errors
    }
  };

  const resetModalUser = () => {
    setModalUser(null);
  };
  const closeModal = () => {
    setModalUser(null);
    setRelVal({
      name: 'Relationship',
      value: DEFAULT_LIST_VALUE
    });
    onClose();
  };

  useEffect(() => {
    if (open && modalUserFromParent) {
      setModalUser(modalUserFromParent);
    }
  }, [open]);

  useEffect(() => {
    if (isPresentInCircle) {
      setUserAlreadyinCircle(true);
    } else if (
      !!modalUser &&
      !!circleUserIds?.find(id => id === modalUser.uid)
    ) {
      setUserAlreadyinCircle(true);
    } else {
      setUserAlreadyinCircle(false);
    }
  }, [modalUser, circleUserIds, isPresentInCircle]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
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
            <div className='inline-block w-full max-w-md p-6 my-8  text-left align-middle transition-all transform bg-skin-fill shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                <SectionTitle content='Search user' />
              </Dialog.Title>
              <div className='mt-2'>
                <form
                  className='flex'
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    let email = e.target[0].value;
                    searchUser(email);
                  }}
                >
                  <input
                    type='email'
                    id='userEmail'
                    className='rounded-lg w-full'
                    placeholder={`Search with email id`}
                  />
                  {!modalUser && (
                    <Button
                      icon={{
                        iconName: 'ArrowForward'
                      }}
                      defautStyle='cust-btn-btn'
                      type='submit'
                      styleClasses='text-lg !rounded-full !py-2 !px-2'
                      wrapperClasses='mx-2'
                    />
                  )}
                  {modalUser && (
                    <Button
                      icon={{
                        iconName: 'Close'
                      }}
                      defautStyle='cust-btn-btn'
                      onClick={resetModalUser}
                      styleClasses='text-lg !rounded-full !py-2 !px-2'
                      wrapperClasses='mx-2'
                    />
                  )}
                </form>

                {modalUser && (
                  <div className='mt-4 border-2 rounded-lg p-4 '>
                    <div className='flex items-center space-x-4 '>
                      <div className='shadow-lg w-16 h-16 overflow-hidden border-4 rounded-full'>
                        <ImageComponent
                          src={modalUser.imgUrl || '/images/person.jpg'}
                          alt={'alt'}
                        />
                      </div>
                      <Text
                        content={modalUser.name || 'No Name yet'}
                        tag='h3'
                        styleClasses='text-xl font-semibold'
                      />
                    </div>
                    <div className='my-2 flex items-center w-full'>
                      <ListBoxComp
                        filterKey={FilterDBKeys.relationship}
                        buttonStyleClasses='text-lg '
                        selectedOption={relVal}
                        onSelected={(value, filterKey) => {
                          setRelVal(value);
                        }}
                        options={createListboxOptions(
                          DataConfig.relationship,
                          'Relationship'
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className='mt-4 flex justify-around'>
                <Button
                  text={'Cancel'}
                  defautStyle='cust-btn-btn'
                  onClick={() => {
                    closeModal();
                  }}
                  styleClasses='text-lg mx-auto'
                  wrapperClasses='mx-2'
                />
                {modalUser && !userAlreadyinCircle && (
                  <Button
                    text={'Add to Circle'}
                    defautStyle='cust-btn-btn'
                    onClick={() => {
                      if (relVal.value !== DEFAULT_LIST_VALUE) {
                        addUserToCircle(modalUser, relVal.value);
                      } else {
                        // TODO show error to choose relationship
                      }
                    }}
                    styleClasses='text-lg mx-auto'
                    wrapperClasses='mx-2'
                  />
                )}
                {modalUser && userAlreadyinCircle && (
                  <Text
                    content={'Already in your Circle'}
                    styleClasses='text-base font-semibold'
                  />
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddToCircleDialog;
