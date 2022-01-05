import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface VideoSectionType extends SectionEssentialsType {
  videoID: string;
  desc?: TextType;
}
