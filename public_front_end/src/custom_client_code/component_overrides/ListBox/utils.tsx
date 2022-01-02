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
