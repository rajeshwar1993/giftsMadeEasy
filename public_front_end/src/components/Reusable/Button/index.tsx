import React, { FC } from 'react';
import { ButtonType as Props } from './type';

import { useRouter } from 'next/router';
import { Icon } from '../..';

const Button: FC<Props> = ({
  text,
  link,
  onClick,
  wrapperClasses = '',
  defautStyle = 'cust-btn-btn',
  styleClasses = '',
  icon,
  showOnlyIcon = false,
  type = 'button',
  topScript
}) => {
  const router = useRouter();

  return (
    <div className={`${wrapperClasses}`}>
      <button
        onClick={() => {
          if (link) {
            router.push(link);
          } else if (onClick) {
            onClick();
          }
        }}
        className={`relative cust-btn-base flex justify-center items-center ${defautStyle} ${styleClasses}`}
        type={type}
      >
        {icon && <Icon {...icon} size={icon.size || '20'} />}
        {icon && text && !showOnlyIcon && <div className='w-2' />}
        {text && !showOnlyIcon && <span>{text}</span>}
        {topScript && (
          <span className='flex absolute -top-1 -right-1 h-4 w-4 text-xs text-skin-inverted'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-skin-accent opacity-75'></span>
            <span className='relative rounded-full h-4 w-4 bg-skin-accent'>
              {topScript}
            </span>
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
