import { ButtonType } from '../Reusable/Button/type';
import { IconType } from '../Reusable/Icon/type';

export interface NavConfig {
  title: string;
  logo: {
    img: string;
    alt: string;
  };
  leftSideNav: Array<ButtonType>;
}
