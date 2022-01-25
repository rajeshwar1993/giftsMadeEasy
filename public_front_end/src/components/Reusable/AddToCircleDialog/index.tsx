import React, { FC, Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import UserType, { convertUserJsonToObj } from '../../../models/User';
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
import { FS_USER_DB, FS_USER_MYCIRCLE_DB } from '../../../common/constants';
import CircleUserType, { convertCUJsonToObj } from '../../../models/CircleUser';
import { useAppDispatch } from '../../../redux/store';
import { cu_addUser } from '../../../redux/myCircleList';
import DialogContainer from '../DialogContainer';
import { relationshipFilterValues } from '../../../common/staticFilterValues';
import AppConfig from '../../../common/appConfig';

type AddToCircleDialogProps = {
  open: boolean;
  onClose: () => void;
  modalUserFromParent?: UserType | null;
  currentUser: UserType | null;
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

  const [loading, setLoading] = useState(false);
  const [relVal, setRelVal] = useState({
    name: 'Relationship',
    value: DEFAULT_LIST_VALUE
  });

  const [userAlreadyinCircle, setUserAlreadyinCircle] =
    useState(isPresentInCircle);

  const [modalUser, setModalUser] = useState<UserType | null>(
    modalUserFromParent
  );

  const searchUser = async (itendifier: string) => {
    try {
      setLoading(true);
      // check if me, then return
      if (user?.email === itendifier) return;

      // logic to find user by email
      // TODO add logic to find by phone number
      let foundUser: UserType;
      const userRef = collection(db, FS_USER_DB);
      const primaryDocQuery = query(
        userRef,
        where(UserDBKeys.email, '==', itendifier)
      );
      const snaps = await getDocs(primaryDocQuery);

      if (!snaps.empty) {
        foundUser = convertUserJsonToObj(
          snaps.docs[0].data(),
          snaps.docs[0].id
        );
        setModalUser(foundUser);
      } else {
        setModalUser(null);
      }
      setLoading(false);
    } catch (e) {
      // TODO handle errors
    }
  };

  const addUserToCircle = async (userToAdd: UserType, rel: string) => {
    try {
      // logic to add userToAdd to current user's circle
      setLoading(true);
      let cu = convertCUJsonToObj(
        {
          [CircleUserDBKeys.name]: userToAdd.name,
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
        [CircleUserDBKeys.relation]: rel
      });

      dispatch(cu_addUser(cu));
      setLoading(false);
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
    <DialogContainer open={open} closeModal={closeModal}>
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
              loading={loading}
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
                  width={60}
                  height={60}
                  layout='fixed'
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
                  relationshipFilterValues,
                  AppConfig.COMMON.relationshipLabel
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
    </DialogContainer>
  );
};

export default AddToCircleDialog;
