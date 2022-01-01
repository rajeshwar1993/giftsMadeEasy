import React, { FC } from 'react';
import { BadgeType as Props } from './type';
import AllComponents from '../../../core_custom_mixer/components';

const { Text } = AllComponents;

const Badge: FC<Props> = ({ text, wrapperClasses }) => {
  return (
    <span className={`cust-badge-styles ${wrapperClasses}`}>
      <Text {...text} />
    </span>
  );
};

export default Badge;
