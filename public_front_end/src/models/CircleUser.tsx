import { CircleUserDBKeys } from '../common/dbKeys';

interface CircleUserType {
  uid: string;
  relation: string;
  name: string;
  status: 'p' | 'a';
}

export const convertCUToJson = (cu: CircleUserType) => ({
  [CircleUserDBKeys.relation]: cu.relation,
  [CircleUserDBKeys.name]: cu.name,
  [CircleUserDBKeys.status]: cu.status
});

export const convertCUJsonToObj = (inp: any, id: string) => {
  let it: CircleUserType = {
    uid: id,
    relation: inp[CircleUserDBKeys.relation],
    name: inp[CircleUserDBKeys.name],
    status: inp[CircleUserDBKeys.status]
  };

  return it;
};

export default CircleUserType;
