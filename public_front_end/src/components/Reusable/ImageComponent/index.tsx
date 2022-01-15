import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { ImageComponentType as Props } from './type';

const Image = dynamic(() => import('next/image'));

const ImageComponent: FC<Props> = ({
  src,
  alt,
  layout = 'fill',
  styleClasses = '',
  ...props
}) => {
  return (
    // TODO Need to make use of Image component from next!!

    <div
      className={`w-full h-full overflow-hidden flex justify-center items-center bg-skin-accent bg-opacity-40 ${styleClasses}`}
    >
      <Image
        src={src}
        alt={alt}
        layout={layout}
        objectFit='contain'
        objectPosition={'center'}
        {...props}
      />
    </div>
  );
};

export default ImageComponent;
