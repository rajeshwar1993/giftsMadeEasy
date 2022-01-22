import React, { FC } from 'react';
import { Text } from '../..';
import { TextType } from '../Text/type';

interface CheckListOption {
  text: string;
  value: string;
}

type Props = {
  title?: TextType;
  filterKey: string;
  checkList: Array<CheckListOption>;
  selected: Array<string>;
  onChangeHandler: (key: string, values: Array<string>) => void;
  flexOverride?: string;
};

const CheckBoxGroup: FC<Props> = ({
  title,
  checkList,
  filterKey,
  selected,
  onChangeHandler,
  flexOverride
}) => {
  const handleClick = (value: string, isChecked: boolean) => {
    let updatedValues = [...selected];
    if (isChecked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter(v => v !== value);
    }

    onChangeHandler(filterKey, updatedValues);
  };

  return (
    <div>
      {title && (
        <Text
          tag='label'
          {...title}
          styleClasses={`font-semibold ${title.styleClasses}`}
        />
      )}
      <div className={`flex flex-row xl:flex-col ${flexOverride}`}>
        {checkList.map((cl, i) => (
          <div key={i} className='form-check mt-2 ml-2 pr-4 flex'>
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
              className='form-check-label inline-block text-skin-primary text-lg'
              htmlFor={cl.text}
            >
              {cl.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
