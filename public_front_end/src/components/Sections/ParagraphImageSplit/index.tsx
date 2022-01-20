import React, { FC } from 'react';
import { Button, ImageComponent, SectionTitle, Text } from '../..';

import { ParagraphImageSplitType as Props } from './types';

const ParagraphImageSplit: FC<Props> = ({
  sectionWrapperClasses = '',
  sectionTitle,
  paragraph,
  paragraphWrapperClasses,
  image,
  imageWrapperClasses,
  button,
  id
}) => {
  return (
    <section
      id={id}
      className={`mx-4 md:mx-0 flex flex-col-reverse lg:flex-row h-auto lg:h-[24rem] xl:h-[30rem] bg-skin-inverted text-skin-inverted rounded-lg overflow-hidden ${sectionWrapperClasses}`}
    >
      {/* SectionTitle Section */}
      <div
        className={`lg:w-1/2 w-full flex flex-col justify-center items-center p-8 sm:p-14 lg:border-r-4 border-skin-primary ${paragraphWrapperClasses}`}
      >
        {sectionTitle && <SectionTitle {...sectionTitle} />}

        <Text
          {...paragraph}
          styleClasses={`pb-2 text-xl xl:text-2xl text-center ${paragraph.styleClasses}`}
        />
        {button && <Button {...button} />}
      </div>

      {/* Image Section */}
      <div className={`lg:w-1/2 w-full ${imageWrapperClasses}`}>
        <ImageComponent
          {...image}
          styleClasses={`max-h-96 lg:max-h-full ${image.styleClasses}`}
        />
      </div>
    </section>
  );
};

export default ParagraphImageSplit;
