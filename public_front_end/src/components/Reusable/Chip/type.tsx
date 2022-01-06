import { TextType } from '../Text/type';

export interface BadgeType {
  text: TextType;
  id: string;
  onClick?: (id: string) => void;
  onCancel?: (id: string) => void;
  editMode?: boolean;
  wrapperClasses?: string;
}
