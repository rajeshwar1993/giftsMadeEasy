import { IconType } from '../Icon/type';

export interface ButtonType {
  text?: string;
  link?: string;
  icon?: IconType;
  onClick?: Function;
  wrapperClasses?: string;
  defautStyle?: 'cust-btn-btn' | 'cust-btn-link';
  activated?: boolean;
  styleClasses?: string;
  showOnlyIcon?: boolean;
  topScript?: string | number;
  type?: 'button' | 'reset' | 'submit';
}
