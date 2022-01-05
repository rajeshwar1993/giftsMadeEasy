import { ImageComponentType } from '../../Reusable/ImageComponent/type';
import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface TestimonialType extends SectionEssentialsType {
  text: TextType;
  textWrapperClasses?: string;
  authorText?: string;
  authorTextStyles?: string;
  image?: ImageComponentType;
  imageWrapperStyles?: string;
}
