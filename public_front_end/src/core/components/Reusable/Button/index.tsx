import React, { FC } from 'react';
import { ButtonType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';
import { useRouter } from 'next/router';

const Button: FC<Props> = ({
  text,
  link,
  onClick,
  wrapperClasses = '',
  defautStyle = 'cust-btn-btn',
  styleClasses = '',
  icon,
  showOnlyIcon = false
}) => {
  const { Icon } = AllComponents;
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
        className={`cust-btn-base flex items-center ${defautStyle} ${styleClasses}`}
      >
        {icon && <Icon {...icon} size={icon.size || '20'} />}
        {icon && text && !showOnlyIcon && <div className='w-2' />}
        {text && !showOnlyIcon && <span>{text}</span>}
      </button>
    </div>
  );
};

export default Button;
