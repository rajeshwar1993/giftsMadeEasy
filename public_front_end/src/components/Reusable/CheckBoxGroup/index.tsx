import React, { FC, useEffect, useState } from 'react';
import { Text } from '../..';
import { TextType } from '../Text/type';

export interface CheckListOption {
  text: string;
  value: string;
}

type Props = {
  title?: TextType;
  filterKey: string;
  checkList: Array<CheckListOption>;
  selected: Array<string>;
  onChangeHandler: (
    key: string,
    values: Array<string>,
    currentValue: string,
    isChecked: boolean
  ) => void;
  flexOverride?: string;
  showSelectAll?: boolean;
};

const CheckBoxGroup: FC<Props> = ({
  title,
  checkList,
  filterKey,
  selected,
  onChangeHandler,
  flexOverride,
  showSelectAll = false
}) => {
  const [selectAllValue, setSelectAllValue] = useState(false);

  const handleClick = (value: string, isChecked: boolean) => {
    let updatedValues = [...selected];
    if (isChecked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter(v => v !== value);
    }

    if (updatedValues.length === checkList.length) {
      setSelectAllValue(true);
    } else {
      setSelectAllValue(false);
    }

    onChangeHandler(filterKey, updatedValues, value, isChecked);
  };

  const handleSelectAll = (value: string, isChecked: boolean) => {
    let newSelected: Array<string> = [];
    if (isChecked) {
      // update all checklist values into selected values
      newSelected = checkList.map(ck => ck.value);
      setSelectAllValue(true);
    } else {
      setSelectAllValue(false);
    }

    onChangeHandler(filterKey, newSelected, value, isChecked);
  };

  useEffect(() => {
    if (checkList.every(c => selected.includes(c.value))) {
      setSelectAllValue(true);
    } else {
      setSelectAllValue(false);
    }
  }, [selected]);

  return (
    <div>
      {title && (
        <Text
          tag='label'
          {...title}
          styleClasses={`font-semibold ${title.styleClasses}`}
        />
      )}
      <div className={`grid grid-cols-2 md:grid-cols-1 gap-2 ${flexOverride}`}>
        {showSelectAll && (
          <div className='form-check mt-2 ml-2 flex col-span-2 mx-auto '>
            <input
              className='form-check-input appearance-none h-5 w-5 border-2 border-skin-inverted rounded-sm bg-skin-fill checked:bg-skin-inverted checked:border-skin-inverted focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
              value={'SELECT_ALL'}
              checked={selectAllValue}
              id={`sa_${filterKey}`}
              onChange={e => handleSelectAll(e.target.value, e.target.checked)}
              name={'select_all'}
            />
            <label
              className='form-check-label inline-block text-skin-primary text-lg font-bold'
              htmlFor={`sa_${filterKey}`}
            >
              <Text
                styleClasses='text-base lg:text-lg  cursor-pointer'
                content={'Select All'}
              />
            </label>
          </div>
        )}
        {checkList.map((cl, i) => (
          <div key={i} className='form-check mt-2 ml-2 flex items-center'>
            <input
              className='form-check-input appearance-none h-5 w-5 border-2 border-skin-inverted rounded-sm bg-skin-fill checked:bg-skin-inverted checked:border-skin-inverted focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
              value={cl.value}
              checked={selected.includes(cl.value)}
              id={cl.text}
              onChange={e => handleClick(e.target.value, e.target.checked)}
              name={cl.text}
            />
            <label
              className='form-check-label inline-block text-skin-primary text-lg  cursor-pointer'
              htmlFor={cl.text}
            >
              <Text styleClasses='text-sm lg:text-lg' content={cl.text} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
