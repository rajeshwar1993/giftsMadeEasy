import { IconType } from '../../Reusable/Icon/type';
import { TextType } from '../../Reusable/Text/type';
import { SectionEssentialsType } from '../../type';

export interface TableData {
  text?: TextType;
  icon?: IconType;
  showOnlyIcon?: boolean;
}

export interface TableSectionType extends SectionEssentialsType {
  tableWrapperStyleClasses?: string;
  tableHeaderClasses?: string;
  tableDataClasses?: string;
  desc?: TextType;
  tableHeader?: {
    styleClasses?: string;
    tds: Array<TextType>;
  };
  tableData: {
    rows: Array<{
      tds: Array<TableData>;
    }>;
  };
}
