import { SectionTitleType } from '../../../components/Reusable/SectionTitle/type';
import { Gender } from '../../../models/enums';

export interface ProductListItemType {
  objectID: string;
  apid: string;
  t: string;
  p: string;
  ogp: string;
  r: string;
  piu: Array<string>;
  rt: Array<string>;
  ot: Array<string>;
  it: Array<string>;
  gt: Array<Gender>;
  at: Array<string>;
  path: string;
  au: string;
}
