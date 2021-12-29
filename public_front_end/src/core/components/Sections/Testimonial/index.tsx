import React, { FC } from 'react';
import { TestimonialType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';

const Testimonial: FC<Props> = ({
  sectionWrapperClasses,
  text,
  textWrapperClasses,
  authorText,
  authorTextStyles,
  image,
  imageWrapperStyles,
  id
}) => {
  let { ImageComponent, Text } = AllComponents;
  return (
    <section
      id={id}
      className={`bg-skin-accent mx-4 xl:mx-0 p-10 xl:py-5 flex flex-col xl:flex-row justify-center xl:justify-around items-center rounded-lg ${sectionWrapperClasses}`}
    >
      <div
        className={`relative max-w-lg min-w-[300px] md:min-w-[500px] flex flex-col items-center xl:ml-[30%] ${textWrapperClasses}`}
      >
        {image && (
          <div
            className={`border-4 border-skin-primary xl:absolute w-40 h-40 xl:h-56 xl:w-56 -left-3/4 -top-1/2 rounded-full lg:shadow-lg mb-8 xl:mb-0 overflow-hidden ${imageWrapperStyles}`}
          >
            <ImageComponent {...image} />
          </div>
        )}
        <span className='text-7xl absolute text-skin-inverted top-0 xl:-top-4 -left-3 md:-left-10 opacity-70'>
          ❝
        </span>
        <Text
          {...text}
          styleClasses={`text-center text-skin-inverted font-semibold text-xl ${text.styleClasses}`}
        />
        <span className='text-7xl absolute text-skin-inverted top-0 xl:-top-4 -right-3 md:-right-10 opacity-70'>
          ❞
        </span>
        {authorText && (
          <div
            className={`text-center text-skin-inverted font-bold text-lg mt-4 italic ${authorTextStyles}`}
          >
            {authorText}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
