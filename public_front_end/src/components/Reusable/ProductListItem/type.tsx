import { SectionTitleType } from '../../../components/Reusable/SectionTitle/type';

export interface ProductListItemType {
  title: SectionTitleType;
  price?: string;
  designType?: 'sm' | 'lg' | 'xl';
}
