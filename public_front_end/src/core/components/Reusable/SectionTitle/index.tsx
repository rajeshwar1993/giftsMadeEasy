import React, { FC } from 'react';
import { SectionTitleType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';

const SectionTitle: FC<Props> = props => {
  let { Text } = AllComponents;
  return (
    <div className={`mb-4 ${props.wrapperClasses || ''}`}>
      <Text
        {...props}
        styleClasses={` text-4xl xl:text-5xl font-light ${
          props.styleClasses || ''
        }`}
        tag={props.tag || 'h2'}
      />
    </div>
  );
};

export default SectionTitle;
