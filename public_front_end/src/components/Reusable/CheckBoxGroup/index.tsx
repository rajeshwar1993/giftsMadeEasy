import React, { FC, useEffect, useState } from 'react';
import { Text } from '../..';
import { TextType } from '../Text/type';

export interface CheckListOption {
  text: string;
  value: string;
  desc?: string;
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
  gridOverride?: string;
  showSelectAll?: boolean;
};

const CheckBoxGroup: FC<Props> = ({
  title,
  checkList,
  filterKey,
  selected,
  onChangeHandler,
  gridOverride,
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
      <div
        className={`grid grid-cols-2 place-items-start md:grid-cols-2 gap-2 ${gridOverride}`}
      >
        {showSelectAll && (
          <div className='mt-2 ml-2 flex col-span-2 mx-auto '>
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
              className='form-check-label inline-block text-skin-primary text-lg font-bold cursor-pointer'
              htmlFor={`sa_${filterKey}`}
            >
              <Text
                styleClasses='text-base md:text-lg lg:text-lg'
                content={'Select All'}
              />
            </label>
          </div>
        )}
        {checkList.map((cl, i) => (
          <div key={i} className='mt-2 ml-2 flex items-start'>
            <input
              className='form-check-input appearance-none h-5 w-5 border-2 border-skin-inverted rounded-sm bg-skin-fill checked:bg-skin-inverted checked:border-skin-inverted focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
              value={cl.value}
              checked={selected.includes(cl.value)}
              id={cl.value}
              onChange={e => handleClick(e.target.value, e.target.checked)}
              name={cl.value}
            />
            <label
              className='form-check-label inline-block text-skin-primary text-lg cursor-pointer'
              htmlFor={cl.value}
            >
              <div className='flex flex-col'>
                <Text
                  styleClasses={`text-sm md:text-base lg:text-lg font-semibold`}
                  content={cl.text}
                />
                {cl.desc && <Text styleClasses='text-xs' content={cl.desc} />}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
