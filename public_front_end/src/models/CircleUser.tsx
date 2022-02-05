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

export default CircleUserType;
