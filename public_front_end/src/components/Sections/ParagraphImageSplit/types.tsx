import { ButtonType } from '../../Reusable/Button/type';
import { ImageComponentType } from '../../Reusable/ImageComponent/type';
import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface ParagraphImageSplitType extends SectionEssentialsType {
  paragraph: TextType;
  image: ImageComponentType;
  paragraphWrapperClasses?: string;
  imageWrapperClasses?: string;
  button?: ButtonType;
}
