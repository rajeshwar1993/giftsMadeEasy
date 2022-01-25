import { ListBoxOption } from './types';

export const DEFAULT_LIST_VALUE = '';

export const createListboxOptions = (
  dataObj: Map<string, string>,
  defaultValue: string
) => {
  let options = [{ name: defaultValue, value: DEFAULT_LIST_VALUE }];

  dataObj.forEach((value, key) => {
    options.push({ name: value, value: key });
  });

  return options;
};

export const getOptionFromValue = (
  dataObj: Map<string, string>,
  key: any,
  defaultName: string
) => {
  let option: ListBoxOption = { name: defaultName, value: DEFAULT_LIST_VALUE };

  let val = dataObj.get(key);

  if (val) {
    option = { name: val, value: key };
  }

  return option;
};
