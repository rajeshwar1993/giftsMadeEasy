import React, { FC } from 'react';
import AppLink from '../AppLink';
import Button from '../Button';
import { ButtonType } from '../Button/type';
import SectionTitle from '../SectionTitle';
import { SectionTitleType } from '../SectionTitle/type';
import Text from '../Text';
import { TextType } from '../Text/type';

type Props = {
  title?: SectionTitleType;
  text: TextType;
  link?: string;
  linkText?: string;
  btn?: ButtonType;
};

const BannerCTA: FC<Props> = ({ title, text, link, linkText, btn }) => {
  return (
    <div className='flex flex-col items-center lg:items-start space-y-4 w-full px-8 py-4 border-2 border-skin-primary rounded-lg bg-skin-inverted text-skin-inverted'>
      {title && <SectionTitle {...title} />}
      <Text
        {...text}
        styleClasses={`text-center lg:text-left ${text.styleClasses}`}
      />
      {link && linkText && <AppLink link={link} text={linkText} />}
      {btn && <Button {...btn} styleInverted={true} />}
    </div>
  );
};

export default BannerCTA;
