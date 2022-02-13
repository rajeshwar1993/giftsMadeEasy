import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, {
  FC,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, ImageComponent, Text } from '../../components';
import AddToCircleDialog from '../../components/Reusable/AddToCircleDialog';
import { db, storage } from '../../firebase';
import { FS_CIRCLE_USERS_DB } from '../../common/constants';
import UserType from '../../models/User';
import { cu_init, cu_removeUser } from '../../redux/myCircleList';
import { RootState, useAppDispatch } from '../../redux/store';
import ProfileAboutSection from './profileAboutSection';
import ProfileGenderSection from './profileGenderSection';
import OKCancelBtn from '../../components/Reusable/OKCancelBtn';
import ProfileImpDatesSection from './profileImpDates';
import { Gender } from '../../models/enums';
import EmailAndPhoneView from './emailAndPhoneView';
import { CircleUserDBKeys } from '../../common/dbKeys';
import CircleUserType, { convertCUJsonToObj } from '../../models/CircleUser';
import { logError } from '../../common/utils';
import { app_sendToast } from '../../redux/appCommon';
type Props = {
  user: UserType;
  saveImgUrl: (url: string) => void;
  isMe: boolean;
  updateAboutText: (text: string) => void;
  updateDates: (dob: string, relDate: string) => void;
  updateGender: (g: Gender) => void;
};

const ProfileImageSection: FC<Props> = ({
  user,
  saveImgUrl,
  isMe,
  updateAboutText,
  updateDates,
  updateGender
}) => {
  const dispatch = useAppDispatch();

  const [newImg, updateNewImg] = useState<any>(user.imgUrl || null);
  const [newImgFile, updateNewImgFile] = useState<any>(null);
  const imgUploadRef = useRef<any>();

  // const [inMyCircle, setInMyCircle] = useState<'p' | 'a' | false>(false);
  const [openAddCircle, setOpenAddCircle] = useState(false);
  const [activateRemove, setActivteRemove] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.data);
  const circleUsers = useSelector((state: RootState) => state.circleUser.list);

  const [editMode, toggleEditMode] = useState(false);

  // sates for about text
  const [aboutText, setAboutText] = useState(user.aboutText);
  const textRef = useRef<any>(null);

  // gender state
  const [selectedGender, updateSelectedGender] = useState<Gender>(user.gender);
  let tempGender = user.gender;

  //date states
  const [dobVal, updateDobVal] = useState(user.dob);
  const [relVal, updateRelVal] = useState(user.relDate);
  const dobRef = useRef<any>(null);
  const relRef = useRef<any>(null);

  const checkUserAlreadyInCircle = async () => {
    try {
      const col = collection(db, FS_CIRCLE_USERS_DB);
      const q = query(
        col,
        where(CircleUserDBKeys.userCircle, '==', currentUser?.uid)
      );

      const querySnapshot = await getDocs(q);
      const dbCU: Array<CircleUserType> = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        dbCU.push(convertCUJsonToObj(doc.data(), doc.id));
      });

      dispatch(cu_init(dbCU));
    } catch (e: any) {
      logError(
        e.message,
        e.stack,
        'checkUserAlreadyInCircle',
        'profileImageSection'
      );
    }
  };

  const removeUserFromCircle = async () => {
    try {
      let cudoc = circleUsers.find(
        cu => cu.userCircle === currentUser?.uid && cu.userAdded === user.uid
      );

      if (cudoc) {
        deleteDoc(doc(db, FS_CIRCLE_USERS_DB, cudoc.docid));
        dispatch(cu_removeUser(cudoc.docid));
      } else {
        dispatch(
          app_sendToast({
            type: 'error',
            message: 'Error in removing circle user'
          })
        );
      }
    } catch (e: any) {
      logError(
        e.message,
        e.stack,
        'removeUserFromCircle',
        'profileImageSection'
      );
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in removing circle user'
        })
      );
    }
  };

  const closeModal = () => {
    setOpenAddCircle(false);
  };

  const imgChange = () => {
    let file;
    if (imgUploadRef.current && imgUploadRef.current.files) {
      file = imgUploadRef.current.files[0];
      updateNewImgFile(file);
      let reader = new FileReader();
      reader.onload = function (e: any) {
        updateNewImg(e.target.result);
      };
      reader.readAsDataURL(file); // convert to base64 string
    }
  };

  const onImageSave = async () => {
    try {
      console.log(newImgFile);

      if (!newImgFile) {
        dispatch(
          app_sendToast({
            type: 'error',
            message: 'No image found.'
          })
        );
        return;
      }
      const file = newImgFile;
      updateNewImgFile(null);
      // check image size
      if (file.size > 4000000) {
        dispatch(
          app_sendToast({
            type: 'error',
            message: 'Image size should be less than 4 MB.'
          })
        );
        return;
      }

      const imageStoreRef = ref(
        storage,
        `/images/user/PP_${user.uid}.${
          file.name.split('.')[file.name.split('.').length - 1]
        }`
      );

      // 'file' comes from the Blob or File API
      await uploadBytes(imageStoreRef, file);
      // TODO make cloud function to reduce image size
      getDownloadURL(imageStoreRef)
        .then(url => {
          // `url` is the download URL for 'images/stars.jpg'

          saveImgUrl(url);
          updateNewImg(url);
        })
        .catch((e: any) => {
          // Handle any errors
          logError(e.message, e.stack, 'getDownloadURL', 'profileImageSection');
          dispatch(
            app_sendToast({
              type: 'error',
              message: 'Error in saving image.'
            })
          );
        });
    } catch (e: any) {
      logError(e.message, e.stack, 'onImageSave', 'profileImageSection');
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in saving image.'
        })
      );
    }
  };

  const inMyCircle = useMemo(() => {
    const u = circleUsers.find(cu => cu.userAdded === user.uid);
    if (u && u.status === 'p') {
      return 'p';
    } else if (u && u.status === 'a') {
      return 'a';
    } else return false;
  }, [circleUsers, user]);

  useEffect(() => {
    if (currentUser && circleUsers.length === 0) checkUserAlreadyInCircle();
  }, [currentUser, circleUsers.length]);

  return (
    <>
      <div className='flex flex-col md:sticky md:top-44 lg:top-32'>
        <div className='flex flex-row md:flex-col justify-center items-center'>
          <div className='relative'>
            <div className='shadow-lg w-40 h-40 xl:w-64 xl:h-64  overflow-hidden border-4 rounded-full '>
              <ImageComponent
                src={newImg}
                alt={user.name}
                width={300}
                height={300}
                layout='fixed'
              />
            </div>
            {!newImgFile && isMe && (
              <div className='absolute top-2 xl:top-6 left-28 xl:left-[calc(100%-70px)]'>
                <label className='block text-skin-primary bg-skin-fill p-1 rounded-full border-2 border-skin-inverted hover:bg-skin-fill-accent-hover cursor-pointer transition duration-200'>
                  <Icon iconName='Camera' />
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    name={'galleryimg'}
                    ref={imgUploadRef}
                    onChange={() => imgChange()}
                  />
                </label>
              </div>
            )}
            {newImgFile && (
              <>
                <div className='absolute top-2 xl:top-6 left-28 xl:left-[calc(100%-70px)]'>
                  <Button
                    icon={{
                      iconName: 'Check'
                    }}
                    defautStyle='cust-btn-btn'
                    onClick={() => {
                      onImageSave();
                    }}
                    styleClasses='text-lg !rounded-full !py-2 !px-2 text-skin-primary bg-skin-fill'
                    wrapperClasses='mx-2'
                  />
                </div>
                <div className='absolute top-2 xl:top-6 left-28 xl:left-2'>
                  <Button
                    icon={{
                      iconName: 'Close'
                    }}
                    defautStyle='cust-btn-btn'
                    onClick={() => {
                      updateNewImg(user.imgUrl);
                      updateNewImgFile(null);
                    }}
                    styleClasses='text-lg !rounded-full !py-2 !px-2 text-skin-primary bg-skin-fill'
                    wrapperClasses='mx-2'
                  />
                </div>
              </>
            )}
          </div>
          <div className='p-2 flex flex-col justify-center items-center w-full'>
            {!editMode && isMe && (
              <Button
                icon={{
                  iconName: 'Pencil'
                }}
                defautStyle='cust-btn-btn'
                onClick={() => {
                  toggleEditMode(true);
                  tempGender = selectedGender;
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2 ml-auto'
              />
            )}
            {editMode && isMe && (
              <OKCancelBtn
                onClose={() => {
                  toggleEditMode(false);
                  updateSelectedGender(tempGender);
                }}
                onSave={() => {
                  toggleEditMode(false);
                  // about text
                  setAboutText(textRef.current.value);
                  updateAboutText(textRef.current.value);
                  // gender
                  updateGender(selectedGender);
                  // dates
                  updateDobVal(dobRef.current!.value);
                  updateRelVal(relRef.current!.value);
                  const ds = new Date(dobRef.current!.value).toISOString();
                  const rs = new Date(relRef.current!.value).toISOString();
                  updateDates(ds, rs);
                }}
              />
            )}

            <div
              className={`my-2 text-center flex ${
                editMode ? 'flex-col space-y-6' : 'flex-row'
              }`}
            >
              <Text
                content={user.name}
                tag='h1'
                styleClasses='text-2xl font-semibold'
              />

              <ProfileGenderSection
                editMode={editMode}
                selected={selectedGender}
                updateSelected={updateSelectedGender}
              />
            </div>
            {!isMe && inMyCircle === false && (
              <Button
                text='Add To Circle'
                wrapperClasses='w-full my-2'
                styleClasses='w-full'
                onClick={() => setOpenAddCircle(true)}
              />
            )}
            {!isMe && inMyCircle && (
              <>
                {!activateRemove && inMyCircle === 'a' && (
                  <Button
                    icon={{ iconName: 'Check' }}
                    text='In your Circle'
                    wrapperClasses='w-full my-2'
                    styleClasses='w-full'
                    onClick={() => setActivteRemove(true)}
                  />
                )}
                {!activateRemove && inMyCircle === 'p' && (
                  <Text
                    content='Circle Request Pending'
                    styleClasses='font-semibold'
                  />
                )}
                {activateRemove && (
                  <div className='flex flex-col items-center space-y-2'>
                    <Text
                      content={'Remove from Circle?'}
                      styleClasses='text-2xl font-semibold'
                    />
                    <div className='flex flex-row justify-around '>
                      <Button
                        icon={{
                          iconName: 'Check'
                        }}
                        defautStyle='cust-btn-btn'
                        onClick={() => {
                          removeUserFromCircle();
                          setActivteRemove(false);
                        }}
                        styleClasses='text-lg !rounded-full !py-2 !px-2'
                        wrapperClasses='mx-2'
                      />
                      <Button
                        icon={{
                          iconName: 'Close'
                        }}
                        defautStyle='cust-btn-btn'
                        onClick={() => {
                          setActivteRemove(false);
                        }}
                        styleClasses='text-lg !rounded-full !py-2 !px-2'
                        wrapperClasses='mx-2'
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* About Section */}
        <ProfileAboutSection
          text={aboutText}
          editMode={editMode}
          textRef={textRef}
        />
        <ProfileImpDatesSection
          dobVal={dobVal}
          relVal={relVal}
          dobRef={dobRef}
          relRef={relRef}
          editMode={editMode}
        />
        {isMe && (
          <EmailAndPhoneView
            uid={user.uid}
            email={user.email}
            ext={user.phoneExt}
            phone={user.phoneNumber}
          />
        )}
      </div>
      <AddToCircleDialog
        open={openAddCircle}
        onClose={closeModal}
        currentUser={currentUser}
        isPresentInCircle={!!inMyCircle}
        modalUserFromParent={user}
      />
    </>
  );
};

export default ProfileImageSection;
