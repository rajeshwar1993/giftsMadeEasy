import { Dialog, Transition } from '@headlessui/react';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataConfig from '../../common/componentConfig';
import {
  CircleUserDBKeys,
  FilterDBKeys,
  UserDBKeys
} from '../../common/dbKeys';
import { Button, ImageComponent, SectionTitle, Text } from '../../components';
import ListBoxComp from '../../components/Reusable/ListBox';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE
} from '../../components/Reusable/ListBox/utils';
import ProfileGlance from '../../components/Reusable/ProfileGlance';
import { db } from '../../firebase';
import CircleUser from '../../models/CircleUser';
import { FS_USER_DB, FS_USER_MYCIRCLE_DB } from '../../models/constants';
import User from '../../models/User';
import { cu_addUser, cu_init } from '../../redux/myCircleList';
import { RootState, useAppDispatch } from '../../redux/store';

const MyCircle = () => {
  const circleUsers = useSelector((state: RootState) => state.circleUser.list);
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  const closeModal = () => {
    setOpenModal(false);
    setModalUser(null);
  };

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

  const resetModalUser = () => {
    setModalUser(null);
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

      setModalUser(null);
      setOpenModal(false);
    } catch (e) {
      console.log(e);
      // TODO handle errors
    }
  };

  const fetchAndUpdateCircleUsers = async () => {
    try {
      const dbCU: Array<CircleUser> = [];

      const querySnapshot = await getDocs(
        collection(db, `${FS_USER_DB}/${user?.uid}/${FS_USER_MYCIRCLE_DB}`)
      );
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        dbCU.push(CircleUser.convertJsonToObj(doc.data(), doc.id));
      });

      dispatch(cu_init(dbCU));
    } catch (e) {
      console.log(e);
      // TODO handle error
    }
  };

  useEffect(() => {
    if (circleUsers.length === 0 && user) {
      fetchAndUpdateCircleUsers();
    }
  }, [user]);

  return (
    <>
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8'>
        <div className='flex flex-col space-y-10 justify-center items-center'>
          <Button
            icon={{
              iconName: 'Add',
              size: '40'
            }}
            defautStyle='cust-btn-btn'
            onClick={() => setOpenModal(true)}
            styleClasses='text-lg !rounded-full !py-2 !px-2'
            wrapperClasses='mx-2'
          />
          <Text content='Add to Circle' />
        </div>
        {circleUsers.map(cu => (
          <ProfileGlance data={cu} key={cu.uid} />
        ))}
      </div>
      <AddToCircleDialog
        open={openModal}
        onClose={closeModal}
        userObj={modalUser}
        searchUser={searchUser}
        addUserToCircle={addUserToCircle}
        resetModalUser={resetModalUser}
      />
    </>
  );
};

type AddToCircleDialogProps = {
  open: boolean;
  onClose: () => void;
  userObj: User | null;
  searchUser: (itendifier: string) => void;
  addUserToCircle: (userToAdd: User, rel: string) => void;
  resetModalUser: () => void;
};

const AddToCircleDialog: FC<AddToCircleDialogProps> = ({
  open,
  onClose,
  userObj,
  searchUser,
  addUserToCircle,
  resetModalUser
}) => {
  const [relVal, setRelVal] = useState({
    name: 'Relationship',
    value: DEFAULT_LIST_VALUE
  });

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
                  {!userObj && (
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
                  {userObj && (
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

                {userObj && (
                  <div className='mt-4 border-2 rounded-lg p-4 '>
                    <div className='flex items-center space-x-4 '>
                      <div className='shadow-lg w-16 h-16 overflow-hidden border-4 rounded-full'>
                        <ImageComponent
                          src={userObj.imgUrl || '/images/person.jpg'}
                          alt={'alt'}
                        />
                      </div>
                      <Text
                        content={userObj.name || 'No Name yet'}
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
                    onClose();
                  }}
                  styleClasses='text-lg mx-auto'
                  wrapperClasses='mx-2'
                />
                {userObj && (
                  <Button
                    text={'Add to Circle'}
                    defautStyle='cust-btn-btn'
                    onClick={() => {
                      if (relVal.value !== DEFAULT_LIST_VALUE) {
                        addUserToCircle(userObj, relVal.value);
                      } else {
                        // TODO show error to choose relationship
                      }
                    }}
                    styleClasses='text-lg mx-auto'
                    wrapperClasses='mx-2'
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

export default MyCircle;
