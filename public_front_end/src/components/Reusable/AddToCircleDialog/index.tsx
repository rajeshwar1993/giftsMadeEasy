import React, { FC, Fragment, useContext, useEffect, useState } from 'react';

import { Dialog } from '@headlessui/react';
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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { FS_USER_DB, FS_CIRCLE_USERS_DB } from '../../../common/constants';
import { convertCUJsonToObj } from '../../../models/CircleUser';
import { useAppDispatch } from '../../../redux/store';
import { cu_addUser } from '../../../redux/myCircleList';
import DialogContainer from '../DialogContainer';
import { relationshipFilterValues } from '../../../common/staticFilterValues';
import AppConfig from '../../../common/appConfig';
import { searchUsers as searchUsersAlgolia } from '../../../common/algolia';
import Icon from '../Icon';
import AppLink from '../AppLink';
import { app_toggle_inviteDialogOpen } from '../../../redux/appCommon';

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
  const [error, setError] = useState('');
  const [relVal, setRelVal] = useState({
    text: 'Relationship',
    value: DEFAULT_LIST_VALUE
  });

  const [userAlreadyinCircle, setUserAlreadyinCircle] =
    useState(isPresentInCircle);

  const [modalUser, setModalUser] = useState<UserType | null>(
    modalUserFromParent
  );

  const [usersFound, setUsersFound] = useState<Array<{
    uid: string;
    name: string;
    imgUrl: string;
  }> | null>([]);

  const searchUser = async (identifier: string) => {
    try {
      setLoading(true);
      setError('');
      setUsersFound([]);
      // length check
      if (identifier.length < 4) {
        setError('Please enter at least 4 characters.');
        setLoading(false);
        return;
      }
      if (identifier === '.com') {
        setError(`Nope, this won't work.`);
        setLoading(false);
        return;
      }

      // logic to find user by email or name
      const res: any = await searchUsersAlgolia(identifier);
      const hits = res.hits;

      if (hits && hits.length > 0) {
        const users = hits.map((h: any) => ({
          uid: h['objectID'],
          name: h[UserDBKeys.name],
          imgUrl: h[UserDBKeys.imgUrl]
        }));
        setUsersFound(users.slice(0, 5));
      } else {
        setUsersFound(null);
      }

      // setModalUser(foundUser);
    } catch (e) {
      // TODO handle errors
      console.log(e);
      setError('Error occured while searching for user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      let foundUser: UserType;
      const userRef = collection(db, FS_USER_DB);
      const res = await getDoc(doc(userRef, id));

      if (res.exists()) {
        foundUser = convertUserJsonToObj(res.data(), res.id);
        setModalUser(foundUser);
        setUsersFound([]);
      } else {
        setError('Error occured while fetching user. Please try again.');
      }
      setLoading(false);
    } catch (e) {
      // TODO handle error
      setError('Error occured while fetching user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addUserToCircle = async (userToAdd: UserType, rel: string) => {
    try {
      // check if me, then return
      // TODO - add this check to select user
      if (user?.uid === userToAdd.uid) {
        setError('Hey, is this you?');
        return;
      }

      // logic to add userToAdd to current user's circle
      setLoading(true);
      setError('');

      let col = collection(db, FS_CIRCLE_USERS_DB);
      const res = await addDoc(col, {
        [CircleUserDBKeys.userCircle]: user?.uid,
        [CircleUserDBKeys.userAdded]: userToAdd.uid,
        [CircleUserDBKeys.relation]: rel,
        [CircleUserDBKeys.status]: 'p',
        [CircleUserDBKeys.createdTS]: serverTimestamp()
      });

      let cu = convertCUJsonToObj(
        {
          [CircleUserDBKeys.userCircle]: user?.uid,
          [CircleUserDBKeys.userAdded]: userToAdd.uid,
          [CircleUserDBKeys.relation]: rel,
          [CircleUserDBKeys.status]: 'p'
        },
        res.id
      );

      dispatch(cu_addUser(cu));
      setLoading(false);
      closeModal();
    } catch (e) {
      console.log(e);
      // TODO handle errors
      setError('Error occured while adding user to circle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetModalUser = () => {
    setModalUser(null);
    const e: any = document.getElementById('searchKey');
    if (e) {
      e.value = '';
    }
  };
  const closeModal = () => {
    setModalUser(null);
    setError('');
    setRelVal({
      text: 'Relationship',
      value: DEFAULT_LIST_VALUE
    });
    onClose();
  };

  useEffect(() => {
    setUsersFound([]);
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
        className='text-lg font-medium leading-6 text-skin-primary'
      >
        <SectionTitle content='Search user' />
      </Dialog.Title>
      <div className='mt-2'>
        <form
          className='flex'
          onSubmit={(e: any) => {
            e.preventDefault();
            let identifier = e.target[0].value;
            searchUser(identifier);
          }}
        >
          <input
            type='text'
            id='searchKey'
            className='rounded-lg w-full'
            placeholder={`Search with Name or Email-id`}
            required
            disabled={!!modalUser}
            defaultValue={modalUser?.name}
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

        <div className='my-4'>
          {!usersFound && (
            <div>
              <Text content='No users found.' />
              <Button
                text='Would you like to send an invite?'
                defautStyle='cust-btn-link'
                onClick={() => {
                  dispatch(app_toggle_inviteDialogOpen(true));
                  onClose();
                }}
              />
            </div>
          )}
          {usersFound &&
            usersFound.map(u => (
              <div
                onClick={() => {
                  if (!loading) fetchUser(u.uid);
                }}
                className=' cursor-pointer flex justify-between items-center py-1 my-2 rounded-lg px-4 border-2  hover:bg-skin-fill-accent-hover'
              >
                <div className='flex space-x-2'>
                  <div>
                    <ImageComponent
                      src={u.imgUrl || '/images/logo.png'}
                      alt={u.name}
                      layout='fixed'
                      width={30}
                      height={30}
                    />
                  </div>
                  <Text content={u.name} />
                </div>
                {loading && (
                  <Icon
                    styleClasses='animate-spin'
                    iconName='Spinner'
                    size={'20'}
                  />
                )}
                {!loading && <Icon iconName={'ArrowForward'} />}
              </div>
            ))}
        </div>

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
      {error && <Text content={error} styleClasses='text-skin-error' />}
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
                setError('Please choose a relationship.');
              }
            }}
            styleClasses='text-lg mx-auto'
            wrapperClasses='mx-2'
            loading={loading}
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
