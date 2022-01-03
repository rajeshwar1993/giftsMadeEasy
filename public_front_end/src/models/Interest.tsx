import { InterestTagDBKeys } from '../helpers/dbKeys';

class InterestTag {
  uid: string;
  value: string;
  productCount: number;
  userCount: number;
  subIntestests: Array<InterestTag>;
  parentId: string;

  constructor() {
    this.uid = '';
    this.value = '';
    this.productCount = 0;
    this.userCount = 0;
    this.subIntestests = [];
    this.parentId = '__PARENT__';
  }

  convertToJson = () => ({
    [InterestTagDBKeys.value]: this.value,
    [InterestTagDBKeys.productCount]: this.productCount,
    [InterestTagDBKeys.userCount]: this.userCount,
    [InterestTagDBKeys.parentId]: this.parentId
  });

  static convertJsonToObj = (inp: any, id: string) => {
    let it = new InterestTag();
    it.uid = id;
    it.value = inp[InterestTagDBKeys.value];
    it.productCount = inp[InterestTagDBKeys.productCount];
    it.userCount = inp[InterestTagDBKeys.userCount];
    it.parentId = inp[InterestTagDBKeys.parentId];

    return it;
  };
}

export default InterestTag;
