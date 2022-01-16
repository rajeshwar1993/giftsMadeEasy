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
  activated = false,
  styleClasses = '',
  icon,
  showOnlyIcon = false,
  type = 'button',
  topScript = 0,
  disabled = false,
  loading = false,
  ...props
}) => {
  const router = useRouter();

  return (
    <div className={`${wrapperClasses}`}>
      <button
        {...props}
        disabled={disabled || loading}
        onClick={() => {
          if (onClick) {
            onClick();
          }
          if (link) {
            router.push(link);
          }
        }}
        className={`relative py-0.5 font-semibold transition duration-200 ease-in-out cursor-pointer flex justify-center items-center ${styleClasses} ${
          defautStyle === 'cust-btn-link'
            ? 'border-b-2 border-skin-accent border-opacity-10 hover:border-opacity-90'
            : 'px-4 border-2 rounded-md border-skin-inverted hover:bg-skin-accent hover:text-skin-inverted'
        }
        ${activated ? 'bg-skin-accent text-skin-inverted' : ''}
        ${
          disabled || loading
            ? 'opacity-50 !cursor-default hover:bg-skin-fill hover:text-skin-primary'
            : ''
        }`}
        type={type}
      >
        {loading && (
          <Icon
            styleClasses='animate-spin'
            iconName='Spinner'
            size={icon?.size || '20'}
          />
        )}
        {icon && !loading && <Icon {...icon} size={icon.size || '20'} />}
        {(icon || loading) && text && !showOnlyIcon && <div className='w-2' />}
        {text && !showOnlyIcon && <span>{text}</span>}
        {topScript !== 0 && topScript !== '' && (
          <span className='flex absolute -top-1 -right-1 h-4 w-4 text-xs text-skin-inverted '>
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
