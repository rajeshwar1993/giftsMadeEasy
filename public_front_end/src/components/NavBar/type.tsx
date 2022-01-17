import { Expand } from '@headlessui/react/dist/types';
import { ButtonType } from '../Reusable/Button/type';
import { IconType } from '../Reusable/Icon/type';
import { TextType } from '../Reusable/Text/type';

export interface ExpandMenuItem {
  title: string;
  link?: string;
  items?: Array<ExpandMenuItem>;
}

export interface NavConfig {
  title: string;
  logo: {
    img: string;
    alt: string;
  };
  leftSideNav: Array<{
    type: 'link' | 'expand';
    depth: 0 | 1 | 2;
    data: ButtonType | ExpandMenuItem;
  }>;
}
