import { BannerImageType } from '../components/Reusable/BannerImage/type';
import { ColumnListType } from '../components/Sections/ColumnList/types';
import { DiscolusreListComponentType } from '../components/Sections/DisclosureList/type';
import { ParagraphType } from '../components/Sections/Paragraph/type';
import { ParagraphImageSplitType } from '../components/Sections/ParagraphImageSplit/types';
import { TableSectionType } from '../components/Sections/TableSection/type';
import { TestimonialType } from '../components/Sections/Testimonial/type';
import { VideoSectionType } from '../components/Sections/Video/type';

export interface HeaderType {
  title: string;
  metaDesc: string;
  fav?: string;
}

export interface PageSection {
  type:
    | 'Paragraph'
    | 'ParagraphImageSplit'
    | 'ColumnList'
    | 'Testimonial'
    | 'DisclosureList'
    | 'TableSection'
    | 'Video';
  data:
    | ParagraphType
    | ParagraphImageSplitType
    | ColumnListType
    | TestimonialType
    | DiscolusreListComponentType
    | TableSectionType
    | VideoSectionType;
}

export interface PageProps {
  headerData: HeaderType;
  sections: Array<PageSection>;
}
