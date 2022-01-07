import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Icon, ImageComponent, Text } from '../../components';
import { storage } from '../../firebase';

type Props = {
  uid: string;
  name: string;
  imgUrl: string;
  saveImgUrl: (url: string) => void;
};

const ProfileImageSection: FC<Props> = ({ uid, name, imgUrl, saveImgUrl }) => {
  const [newImg, updateNewImg] = useState<any>(imgUrl || null);
  const [newImgFile, updateNewImgFile] = useState<any>(null);
  const imgUploadRef = useRef<any>();

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
        console.log('no files to work on');
        return;
      }
      const file = newImgFile;
      updateNewImgFile(null);
      // check image size
      if (file.size > 4000000) {
        // TODO make a error display
        console.log('Size is more than 5mb');
        return;
      }

      const imageStoreRef = ref(
        storage,
        `/images/user/PP_${uid}.${
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
        .catch(error => {
          // Handle any errors
          // TODO handle error
        });
    } catch (e) {
      console.log(e);
      // TODO handle error
    }
  };
  // TODO update the default image
  return (
    <div className='flex flex-row xl:flex-col justify-center items-center'>
      <div className='relative'>
        <div className='shadow-lg w-40 h-40 xl:w-64 xl:h-64  overflow-hidden border-4 rounded-full '>
          <ImageComponent src={newImg || '/images/person.jpg'} alt={name} />
        </div>
        {!newImgFile && (
          <div className='absolute top-2 xl:top-6 left-28 xl:left-[calc(100%-70px)]'>
            <label className='block text-skin-primary bg-skin-fill p-1 rounded-full border-2 border-skin-inverted'>
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
                  updateNewImg(imgUrl);
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
        <div className='my-2 text-center'>
          <Text content={name} tag='h1' styleClasses='text-2xl font-semibold' />
        </div>
        <Button
          text='Add To Circle'
          wrapperClasses='w-full my-2'
          styleClasses='w-full'
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ProfileImageSection;
