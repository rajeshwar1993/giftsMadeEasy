import { TextType } from '../../../core/components/Reusable/Text/type';

export interface ListBoxOption {
  name: string;
  value: string;
}

export interface ListBoxType {
  title?: TextType;
  options: Array<ListBoxOption>;
  selectedOption: ListBoxOption;
  onSelected: Function;
  buttonStyleClasses?: string;
  optionsStyleClasses?: string;
}
