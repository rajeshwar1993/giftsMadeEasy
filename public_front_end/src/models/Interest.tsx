import { InterestTagDBKeys } from '../helpers/dbKeys';

class InterestTags {
  uid: string;
  value: string;
  count: number;

  constructor() {
    this.uid = '';
    this.value = '';
    this.count = 0;
  }

  convertToJson = () => ({
    [InterestTagDBKeys.uid]: this.uid,
    [InterestTagDBKeys.value]: this.value,
    [InterestTagDBKeys.count]: this.count
  });

  static convertJsonToObj = (inp: any) => {
    let it = new InterestTags();
    it.uid = inp[InterestTagDBKeys.uid];
    it.value = inp[InterestTagDBKeys.value];
    it.count = inp[InterestTagDBKeys.count];

    return it;
  };
}

export default InterestTags;
