import React, { FC } from 'react';
import { Text } from '../../';
import { SectionTitleType as Props } from './type';

const SectionTitle: FC<Props> = props => {
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
