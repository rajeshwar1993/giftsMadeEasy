import { ButtonType } from '../../Reusable/Button/type';
import { ImageComponentType } from '../../Reusable/ImageComponent/type';
import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface ColumnType {
  colTitle?: TextType;
  body: TextType;
  bodyWrapperStyleClasses?: string;
  button?: ButtonType;
  image?: ImageComponentType;
  imageWrapperClasses?: string;
}

export interface ColumnListType extends SectionEssentialsType {
  columns: Array<ColumnType>;
  colWrapperStyleClasses?: string;
}
