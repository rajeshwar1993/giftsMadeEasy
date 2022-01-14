import { CircleUserDBKeys } from '../common/dbKeys';

interface CircleUserType {
  uid: string;
  relation: string;
  name: string;
}

export const convertCUToJson = (cu: CircleUserType) => ({
  [CircleUserDBKeys.relation]: cu.relation,
  [CircleUserDBKeys.name]: cu.name
});

export const convertCUJsonToObj = (inp: any, id: string) => {
  let it: CircleUserType = {
    uid: id,
    relation: inp[CircleUserDBKeys.relation],
    name: inp[CircleUserDBKeys.name]
  };

  return it;
};

// class CircleUser {
//   uid: string;
//   relation: string;
//   name: string;

//   constructor() {
//     this.uid = '';
//     this.relation = '';
//     this.name = '';
//   }

//   convertToJson = () => ({
//     [CircleUserDBKeys.relation]: this.relation,
//     [CircleUserDBKeys.name]: this.name
//   });

//   static convertJsonToObj = (inp: any, id: string) => {
//     let it = new CircleUser();
//     it.uid = id;
//     it.relation = inp[CircleUserDBKeys.relation];
//     it.name = inp[CircleUserDBKeys.name];

//     return it;
//   };
// }

export default CircleUserType;
