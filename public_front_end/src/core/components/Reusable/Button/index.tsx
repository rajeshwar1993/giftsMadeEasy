import Link from 'next/link';
import React, { FC } from 'react';
import { ButtonType as Props } from './type';
import AllComponents from '../../../../core_custom_mixer/components';

const Button: FC<Props> = ({
  text,
  link,
  onClick,
  wrapperClasses = '',
  styleClasses = '',
  icon,
  showOnlyIcon = false
}) => {
  let { Icon } = AllComponents;

  return (
    <>
      {link && (
        <div
          className={`px-4 py-2 cursor-pointer font-semibold transition duration-200 ease-in-out  ${wrapperClasses}`}
        >
          <Link href={link}>
            <span
              className={`flex justify-center items-center ${styleClasses}`}
            >
              {icon && <Icon {...icon} />}
              {icon && text && !showOnlyIcon && <div className='w-2' />}
              {text && !showOnlyIcon && <span>{text}</span>}
            </span>
          </Link>
        </div>
      )}
      {onClick && (
        <div className={`${wrapperClasses}`}>
          <button
            onClick={() => onClick()}
            className={`px-4 py-2 border-2 border-skin-inverted rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out ${
              showOnlyIcon
                ? ''
                : 'hover:bg-skin-accent hover:text-skin-inverted'
            } ${styleClasses}`}
          >
            {icon && <Icon {...icon} />}
            {icon && text && !showOnlyIcon && <div className='w-2' />}
            {text && !showOnlyIcon && <span>{text}</span>}
          </button>
        </div>
      )}
    </>
  );
};

export default Button;
