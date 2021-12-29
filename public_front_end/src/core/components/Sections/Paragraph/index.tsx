import React, { FC } from 'react';
import AllComponents from '../../../../core_custom_mixer/components';

import { ParagraphType as Props } from './type';

const Paragraph: FC<Props> = ({
  sectionWrapperClasses = '',
  banner,
  sectionTitle,
  paraWrapperClasses = '',
  paragraphs,
  image,
  button,
  imageWrapperClasses,
  id
}) => {
  let { BannerImage, SectionTitle, Button, ImageComponent, Text } =
    AllComponents;
  return (
    <section id={id} className={`mx-4 md:mx-0   ${sectionWrapperClasses}`}>
      {banner && (
        <div className='mb-6 rounded-lg overflow-hidden'>
          <BannerImage {...banner} />
        </div>
      )}

      <div className={`${paraWrapperClasses}`}>
        {sectionTitle && <SectionTitle {...sectionTitle} />}
        {image && (
          <div
            className={`h-[200px] md:w-[350px] w-full overflow-hidden float-none xl:float-right xl:ml-4 xl:mb-4 xl:mt-2 rounded-lg ${imageWrapperClasses}`}
          >
            <ImageComponent {...image} />
          </div>
        )}

        {paragraphs.length > 0 &&
          paragraphs.map((para, i) => (
            <Text
              key={i}
              {...para}
              wrapperStyleClasses={`pb-2 ${para.wrapperStyleClasses}`}
              styleClasses={`cust-paragraph-text ${para.styleClasses}`}
            />
          ))}
        {button && (
          <Button
            {...button}
            wrapperClasses={`mt-4 ${button.wrapperClasses}`}
          />
        )}
      </div>
    </section>
  );
};

export default Paragraph;
