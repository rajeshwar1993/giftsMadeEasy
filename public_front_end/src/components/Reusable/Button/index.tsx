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
  type = 'button'
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
        className={`cust-btn-base flex justify-center items-center ${defautStyle} ${styleClasses}`}
        type={type}
      >
        {icon && <Icon {...icon} size={icon.size || '20'} />}
        {icon && text && !showOnlyIcon && <div className='w-2' />}
        {text && !showOnlyIcon && <span>{text}</span>}
      </button>
    </div>
  );
};

export default Button;
