import { IconType } from '../Icon/type';

export interface ButtonType {
  text?: string;
  link?: string;
  icon?: IconType;
  onClick?: Function;
  wrapperClasses?: string;
  defautStyle?: 'cust-btn-btn' | 'cust-btn-link';
  styleClasses?: string;
  showOnlyIcon?: boolean;
}
