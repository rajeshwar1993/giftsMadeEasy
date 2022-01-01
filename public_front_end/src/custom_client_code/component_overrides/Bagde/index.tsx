import React, { FC } from 'react';
import { BadgeType as Props } from './type';
import AllComponents from '../../../core_custom_mixer/components';

const { Text } = AllComponents;

const Badge: FC<Props> = ({ text }) => {
  return (
    <span className='cust-badge-styles'>
      <Text {...text} />
    </span>
  );
};

export default Badge;
