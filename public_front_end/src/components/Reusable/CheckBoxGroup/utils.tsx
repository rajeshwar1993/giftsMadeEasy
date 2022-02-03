import { CheckListOption } from '.';

export const createCheckboxOptions = (dataObj: Map<string, string>) => {
  let options: Array<CheckListOption> = [];

  dataObj.forEach((value, key) => {
    options.push({ text: value, value: key });
  });

  return options;
};
