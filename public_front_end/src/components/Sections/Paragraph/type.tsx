import { BannerImageType } from '../../Reusable/BannerImage/type';
import { ButtonType } from '../../Reusable/Button/type';
import { ImageComponentType } from '../../Reusable/ImageComponent/type';
import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface ParagraphType extends SectionEssentialsType {
  banner?: BannerImageType;
  paraWrapperClasses?: string;
  paragraphs: Array<TextType>;
  image?: ImageComponentType;
  imageWrapperClasses?: string;
  button?: ButtonType;
}
