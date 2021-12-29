import React, { FC } from 'react';
import { SectionTitleType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';

const SectionTitle: FC<Props> = props => {
  let { Text } = AllComponents;
  return (
    <Text
      {...props}
      styleClasses={`cust-section-title ${props.styleClasses || ''}`}
      wrapperStyleClasses={`text-center mb-8 ${
        props.wrapperStyleClasses || ''
      }`}
      tag={props.tag || 'h2'}
    />
  );
};

export default SectionTitle;
