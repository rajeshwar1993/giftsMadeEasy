import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { EXPORT_MODE } from '../../../common/appConfig';
import { ImageComponentType as Props } from './type';

const Image = dynamic(() => import('next/image'));

const ImageComponent: FC<Props> = ({
  src,
  alt,
  layout = 'fill',
  styleClasses = ''
}) => {
  return (
    <>
      {EXPORT_MODE === 'DYNAMIC' && (
        <div
          className={`w-full h-full overflow-hidden flex justify-center items-center ${styleClasses}`}
        >
          <Image
            src={src}
            alt={alt}
            layout={layout}
            objectFit='cover'
            objectPosition={'center'}
          />
        </div>
      )}
      {/* {EXPORT_MODE === 'STATIC' && (
        <div
          className={`w-full h-full overflow-hidden flex justify-center items-center ${styleClasses}`}
        >
          <img
            src={src}
            alt={alt}
            className='w-full min-h-full flex-shrink-0'
          />
        </div>
      )} */}
    </>
  );
};

export default ImageComponent;
