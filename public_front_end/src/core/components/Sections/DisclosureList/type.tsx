import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface DisclosureListType {
  title: TextType;
  titleWrapperClasses?: string;
  body: TextType;
}

export interface DiscolusreListComponentType extends SectionEssentialsType {
  list: Array<DisclosureListType>;
  listWrapperClasses?: string;
}
