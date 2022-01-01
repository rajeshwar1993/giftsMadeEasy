import React, { FC } from 'react';
import { SectionTitleType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';

const SectionTitle: FC<Props> = props => {
  let { Text } = AllComponents;
  return (
    <div className={`text-center mb-8 ${props.wrapperClasses || ''}`}>
      <Text
        {...props}
        styleClasses={`cust-section-title ${props.styleClasses || ''}`}
        tag={props.tag || 'h2'}
      />
    </div>
  );
};

export default SectionTitle;
