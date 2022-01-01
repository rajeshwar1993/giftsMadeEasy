import { IconType } from '../Icon/type';

export interface ButtonType {
  text?: string;
  link?: string;
  icon?: IconType;
  onClick?: Function;
  wrapperClasses?: string;
  defautStyle?: string;
  styleClasses?: string;
  showOnlyIcon?: boolean;
}
