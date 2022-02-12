import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { ImageComponentType as Props } from './type';

const Image = dynamic(() => import('next/image'));

const ImageComponent: FC<Props> = ({
  src = '/images/logo_sq.png',
  alt,
  layout = 'fill',
  styleClasses = '',
  ...props
}) => {
  if (!src) {
    src = '/images/logo_sq.png';
  }

  return (
    <div
      className={`w-full h-full overflow-hidden flex justify-center items-center ${styleClasses}`}
    >
      <Image
        src={src}
        alt={alt}
        layout={layout}
        objectFit='contain'
        objectPosition={'center'}
        placeholder={'blur'}
        blurDataURL='/images/logo_sq.png'
        {...props}
      />
    </div>
  );
};

export default ImageComponent;
