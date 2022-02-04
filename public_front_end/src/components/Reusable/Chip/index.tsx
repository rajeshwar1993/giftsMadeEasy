import React, { FC } from 'react';
import { Icon, Text } from '../..';
import { BadgeType as Props } from './type';

const Chip: FC<Props> = ({
  text,
  onClick,
  onCancel,
  editMode = false,
  id,
  wrapperClasses = ''
}) => {
  return (
    <span
      data-testid={'chips'}
      id={id}
      onClick={() => {
        if (onClick) onClick(id);
      }}
      className={`py-0.5 px-2 mr-2 mb-2 rounded-lg text-sm lg:text-base whitespace-nowrap bg-skin-inverted bg-opacity-90 text-skin-inverted flex justify-around items-center transition-all duration-200 ${
        !editMode && onClick && 'cursor-pointer hover:bg-opacity-100'
      } ${wrapperClasses}`}
    >
      <Text {...text} />
      {editMode && onCancel && (
        <button
          onClick={() => {
            if (onCancel) onCancel(id);
          }}
          className='ml-2 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 '
        >
          <Icon iconName='Close' size='16' />
        </button>
      )}
    </span>
  );
};

export default Chip;
