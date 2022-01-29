import React, { FC } from 'react';

import { useRouter } from 'next/router';
import { Icon } from '../..';
import Link from 'next/link';
import { IconType } from '../Icon/type';

type Props = {
  text: string;
  link: string;
  wrapperClasses?: string;
  styleClasses?: string;
  icon?: IconType;
  target?: '_self' | '_blank';
  disabled?: boolean;
  loading?: boolean;
};

const AppLink: FC<Props> = ({
  text,
  link,
  wrapperClasses = '',
  styleClasses = '',
  icon,
  disabled = false,
  loading = false,
  target = '_self',
  ...props
}) => {
  const router = useRouter();

  return (
    <div className={`${wrapperClasses}`}>
      <Link href={link}>
        <span
          className={`relative py-0.5 font-semibold transition duration-200 ease-in-out cursor-pointer flex justify-center items-center underline underline-offset-[6px] decoration-accent-soft decoration-[2px] hover:decoration-accent ${styleClasses} 
        ${
          disabled || loading
            ? 'opacity-50 !cursor-default hover:bg-skin-fill hover:text-skin-primary'
            : ''
        }`}
        >
          {loading && (
            <Icon
              styleClasses='animate-spin'
              iconName='Spinner'
              size={icon?.size || '20'}
            />
          )}
          {icon && !loading && <Icon {...icon} size={icon.size || '20'} />}
          {(icon || loading) && text && <div className='w-2' />}
          {text && <span>{text}</span>}
        </span>
      </Link>
    </div>
  );
};

export default AppLink;
