import { ListBoxOption } from './types';

export const DEFAULT_LIST_VALUE = '';

export const createListboxOptions = (
  dataObj: Map<string, string>,
  defaultValue: string
) => {
  let options = [{ text: defaultValue, value: DEFAULT_LIST_VALUE }];

  dataObj.forEach((value, key) => {
    options.push({ text: value, value: key });
  });

  return options;
};

export const getOptionFromValue = (
  dataObj: Map<string, string>,
  key: any,
  defaultName: string
) => {
  let option: ListBoxOption = { text: defaultName, value: DEFAULT_LIST_VALUE };

  let val = dataObj.get(key);

  if (val) {
    option = { text: val, value: key };
  }

  return option;
};
