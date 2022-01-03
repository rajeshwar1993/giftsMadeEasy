import { UserDBKeys } from '../helpers/dbKeys';
import { Gender } from './enums';

class User {
  uid: string;
  name: string;
  aboutText: string;
  isAnonymous: boolean;
  email: string;
  isEmailVerified: boolean;
  phoneExt: string;
  phoneNumber: string;
  dob: string;
  imgUrl: string;
  gender: Gender;
  relDate: string; // relationship date
  interestedTags: Array<string>; // array of interstTag ids
  // datesToRemember: Array<string>; // TODO need to make a separate model for this

  constructor() {
    this.uid = '';
    this.name = '';
    this.aboutText = '';
    this.isAnonymous = false;
    this.email = '';
    this.isEmailVerified = false;
    this.phoneExt = '+91';
    this.phoneNumber = '';
    this.dob = '';
    this.imgUrl = '';
    this.gender = Gender.Female;
    this.relDate = '';
    this.interestedTags = [];
  }

  convertToJson = () => ({
    [UserDBKeys.name]: this.name,
    [UserDBKeys.aboutText]: this.aboutText,
    [UserDBKeys.isAnonymous]: this.isAnonymous,
    [UserDBKeys.email]: this.email,
    [UserDBKeys.isEmailVerified]: this.isEmailVerified,
    [UserDBKeys.phoneExt]: this.phoneExt,
    [UserDBKeys.phoneNumber]: this.phoneNumber,
    [UserDBKeys.dob]: this.dob,
    [UserDBKeys.imgUrl]: this.imgUrl,
    [UserDBKeys.gender]: this.gender.toString(),
    [UserDBKeys.relDate]: this.relDate.toString(),
    [UserDBKeys.interestedTags]: this.interestedTags
  });

  static convertJsonToObj = (inp: any, id: string) => {
    let u = new User();
    u.uid = id;
    u.name = inp[UserDBKeys.name];
    u.aboutText = inp[UserDBKeys.aboutText];
    u.isAnonymous = inp[UserDBKeys.isAnonymous];
    u.email = inp[UserDBKeys.email];
    u.isEmailVerified = inp[UserDBKeys.isEmailVerified];
    u.phoneExt = inp[UserDBKeys.phoneExt];
    u.phoneNumber = inp[UserDBKeys.phoneNumber];
    u.dob = inp[UserDBKeys.dob];
    u.imgUrl = inp[UserDBKeys.imgUrl];
    u.gender = inp[UserDBKeys.gender];
    u.relDate = inp[UserDBKeys.relDate];
    u.interestedTags = inp[UserDBKeys.interestedTags];

    return u;
  };

  updateData = (key: string, value: any) => {
    switch (key) {
      case UserDBKeys.aboutText:
        this.aboutText = value;
        break;
      case UserDBKeys.dob:
        this.dob = value;
        break;
      case UserDBKeys.relDate:
        this.relDate = value;
        break;
      default:
      // do nothing
    }
    return this;
  };
}

export default User;
