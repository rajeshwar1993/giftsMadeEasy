import { UserDBKeys } from '../helpers/dbKeys';
import { Gender } from './enums';

class User {
  uid: string;
  name: string;
  isAnonymous: boolean;
  email: string;
  isEmailVerified: boolean;
  phoneExt: string;
  phoneNumber: string;
  dob: string;
  imgUrl: string;
  gender?: Gender;
  anniversaryDate?: string;
  datesToRemember: Array<string>; //need to make a separate model for this

  constructor() {
    this.uid = '';
    this.name = '';
    this.isAnonymous = false;
    this.email = '';
    this.isEmailVerified = false;
    this.phoneExt = '+91';
    this.phoneNumber = '';
    this.dob = '';
    this.imgUrl = '';
    this.gender = undefined;
    this.datesToRemember = [];
  }

  convertToJson = () => ({
    [UserDBKeys.uid]: this.uid,
    [UserDBKeys.name]: this.name,
    [UserDBKeys.isAnonymous]: this.isAnonymous,
    [UserDBKeys.email]: this.email,
    [UserDBKeys.isEmailVerified]: this.isEmailVerified,
    [UserDBKeys.phoneExt]: this.phoneExt,
    [UserDBKeys.phoneNumber]: this.phoneNumber,
    [UserDBKeys.dob]: this.dob,
    [UserDBKeys.imgUrl]: this.imgUrl,
    [UserDBKeys.gender]: this.gender,
    [UserDBKeys.datesToRemember]: this.datesToRemember
  });

  static convertJsonToObj = (inp: any) => {
    let u = new User();
    u.uid = inp[UserDBKeys.uid];
    u.name = inp[UserDBKeys.name];
    u.isAnonymous = inp[UserDBKeys.isAnonymous];
    u.email = inp[UserDBKeys.email];
    u.isEmailVerified = inp[UserDBKeys.isEmailVerified];
    u.phoneExt = inp[UserDBKeys.phoneExt];
    u.phoneNumber = inp[UserDBKeys.phoneNumber];
    u.dob = inp[UserDBKeys.dob];
    u.imgUrl = inp[UserDBKeys.imgUrl];
    u.gender = inp[UserDBKeys.gender];
    u.datesToRemember = inp[UserDBKeys.datesToRemember];

    return u;
  };
}

export default User;
