import { ListBoxOption } from './types';

export const DEFAULT_LIST_VALUE = '__DEFAULT__';

export const createListboxOptions = (
  dataObj: { [key: string]: any },
  defaultValue: string
) => {
  let options = [{ name: defaultValue, value: DEFAULT_LIST_VALUE }];

  Object.keys(dataObj).map(key => {
    options.push({ name: key, value: dataObj[key] });
  });

  return options;
};

export const getOptionFromValue = (
  dataObj: { [key: string]: any },
  value: any,
  defaultName: string
) => {
  let option: ListBoxOption = { name: defaultName, value: DEFAULT_LIST_VALUE };

  Object.keys(dataObj).forEach(key => {
    if (dataObj[key] === value) {
      option = { name: key, value };
    }
  });

  return option;
};
