import { CircleUserDBKeys } from '../common/dbKeys';

interface CircleUserType {
  docid: string; // doc id
  userCircle: string; // user who's circle
  userAdded: string; // user added to circle
  relation: string;
  status: 'p' | 'a' | 'r';
  createdTS: any;
}

export const convertCUToJson = (cu: CircleUserType) => ({
  [CircleUserDBKeys.relation]: cu.relation,
  [CircleUserDBKeys.userCircle]: cu.userCircle,
  [CircleUserDBKeys.userAdded]: cu.userAdded,
  [CircleUserDBKeys.status]: cu.status
});

export const convertCUJsonToObj = (inp: any, id: string) => {
  let it: CircleUserType = {
    docid: id,
    userCircle: inp[CircleUserDBKeys.userCircle],
    userAdded: inp[CircleUserDBKeys.userAdded],
    relation: inp[CircleUserDBKeys.relation],
    status: inp[CircleUserDBKeys.status],
    createdTS: inp[CircleUserDBKeys.createdTS]
      ? inp[CircleUserDBKeys.createdTS].toDate().toISOString()
      : ''
  };

  return it;
};

export default CircleUserType;
