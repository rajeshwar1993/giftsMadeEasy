import { CircleUserDBKeys } from '../common/dbKeys';

class CircleUser {
  uid: string;
  relation: string;
  imgUrl: string;
  name: string;

  constructor() {
    this.uid = '';
    this.relation = '';
    this.imgUrl = '';
    this.name = '';
  }

  convertToJson = () => ({
    [CircleUserDBKeys.relation]: this.relation,
    [CircleUserDBKeys.imgUrl]: this.imgUrl,
    [CircleUserDBKeys.name]: this.name
  });

  static convertJsonToObj = (inp: any, id: string) => {
    let it = new CircleUser();
    it.uid = id;
    it.relation = inp[CircleUserDBKeys.relation];
    it.imgUrl = inp[CircleUserDBKeys.imgUrl];
    it.name = inp[CircleUserDBKeys.name];

    return it;
  };
}

export default CircleUser;
