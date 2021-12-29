import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { ImageComponentType as Props } from './type';
import { EXPORT_MODE } from '../../../../core_custom_mixer/app_config';

const Image = dynamic(() => import('next/image'));

const ImageComponent: FC<Props> = ({
  src,
  alt,
  layout = 'fill',
  styleClasses = ''
}) => {
  return (
    <>
      {EXPORT_MODE !== 'STATIC' && (
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
      {EXPORT_MODE === 'STATIC' && (
        <div
          className={`w-full h-full overflow-hidden flex justify-center items-center ${styleClasses}`}
        >
          <img
            src={src}
            alt={alt}
            className='w-full min-h-full flex-shrink-0'
          />
        </div>
      )}
    </>
  );
};

export default ImageComponent;
