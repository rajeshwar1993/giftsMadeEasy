import { InterestTagDBKeys } from '../common/dbKeys';

export interface InterestTagType {
  uid: string;
  value: string;
  productCount: number;
  userCount: number;
  parentId: string;
}

export const convertITToJson = (it: InterestTagType) => ({
  [InterestTagDBKeys.value]: it.value,
  [InterestTagDBKeys.productCount]: it.productCount,
  [InterestTagDBKeys.userCount]: it.userCount,
  [InterestTagDBKeys.parentId]: it.parentId
});

export const convertITJsonToObj = (inp: any, id: string) => {
  let it: InterestTagType = {
    uid: id,
    value: inp[InterestTagDBKeys.value],
    productCount: inp[InterestTagDBKeys.productCount],
    userCount: inp[InterestTagDBKeys.userCount],
    parentId: inp[InterestTagDBKeys.parentId]
  };

  return it;
};

// class InterestTag {
//   uid: string;
//   value: string;
//   productCount: number;
//   userCount: number;
//   parentId: string;

//   constructor() {
//     this.uid = '';
//     this.value = '';
//     this.productCount = 0;
//     this.userCount = 0;
//     this.parentId = '__PARENT__';
//   }

//   convertToJson = () => ({
//     [InterestTagDBKeys.value]: this.value,
//     [InterestTagDBKeys.productCount]: this.productCount,
//     [InterestTagDBKeys.userCount]: this.userCount,
//     [InterestTagDBKeys.parentId]: this.parentId
//   });

//   static convertJsonToObj = (inp: any, id: string) => {
//     let it = new InterestTag();
//     it.uid = id;
//     it.value = inp[InterestTagDBKeys.value];
//     it.productCount = inp[InterestTagDBKeys.productCount];
//     it.userCount = inp[InterestTagDBKeys.userCount];
//     it.parentId = inp[InterestTagDBKeys.parentId];

//     return it;
//   };
// }

export default InterestTagType;
