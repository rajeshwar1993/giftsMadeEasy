import React, { FC } from 'react';
import { ImageComponent } from '../../index';
import { BannerImageType as Props } from './type';

const BannerImage: FC<Props> = ({ image, wrapperClasses }) => {
  return (
    <div className={`h-52 xl:h-80 ${wrapperClasses}`}>
      <ImageComponent {...image} />
    </div>
  );
};

export default BannerImage;
