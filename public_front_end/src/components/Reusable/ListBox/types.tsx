import { TextType } from '../../../components/Reusable/Text/type';

export interface ListBoxOption {
  text: string;
  value: string;
}

export interface ListBoxType {
  filterKey: string;
  title?: TextType;
  options: Array<ListBoxOption>;
  selectedOption: ListBoxOption;
  onSelected: (value: ListBoxOption, filterKey: string) => void;
  buttonStyleClasses?: string;
  optionsStyleClasses?: string;
  dataTestId?: string;
}
