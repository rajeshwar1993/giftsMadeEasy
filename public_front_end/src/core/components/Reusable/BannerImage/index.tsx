import React, { FC } from 'react';
import { BannerImageType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';

const BannerImage: FC<Props> = ({ image, wrapperClasses }) => {
  let { ImageComponent } = AllComponents;

  return (
    <div className={`h-52 xl:h-80 ${wrapperClasses}`}>
      <ImageComponent {...image} />
    </div>
  );
};

export default BannerImage;
