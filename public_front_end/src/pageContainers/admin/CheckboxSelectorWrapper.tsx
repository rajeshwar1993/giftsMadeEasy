import React, { FC } from 'react';
import CheckBoxGroup, {
  CheckListOption
} from '../../components/Reusable/CheckBoxGroup';
type Props = {
  filterKey: string;
  checkList: Array<CheckListOption>;
  selected: Array<string>;
  onChangeHandler: (key: string, values: Array<string>) => void;
};

const CheckboxSelectorWrapper: FC<Props> = ({
  filterKey,
  checkList,
  selected,
  onChangeHandler,
  ...props
}) => {
  return (
    <CheckBoxGroup
      filterKey={filterKey}
      checkList={checkList}
      selected={selected}
      onChangeHandler={onChangeHandler}
      {...props}
    />
  );
};

export default CheckboxSelectorWrapper;
