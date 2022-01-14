import { serverTimestamp } from 'firebase/firestore';
import { UserDBKeys } from '../common/dbKeys';
import { Gender } from './enums';

export interface UserObj {
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
  wishlist: Array<string>;
  bookmarks: Array<string>;
  createdTS: any;
}

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
  wishlist: Array<string>;
  bookmarks: Array<string>;
  createdTS: any;

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
    this.wishlist = [];
    this.bookmarks = [];
    this.createdTS = serverTimestamp();
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
    [UserDBKeys.interestedTags]: this.interestedTags,
    [UserDBKeys.wishlist]: this.wishlist,
    [UserDBKeys.bookmarks]: this.bookmarks,
    [UserDBKeys.createdTS]: this.createdTS
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
    u.gender =
      inp[UserDBKeys.gender] === Gender.Female.toString()
        ? Gender.Female
        : Gender.Male;
    u.relDate = inp[UserDBKeys.relDate];
    u.interestedTags = inp[UserDBKeys.interestedTags];
    u.wishlist = inp[UserDBKeys.wishlist] || [];
    u.bookmarks = inp[UserDBKeys.bookmarks] || [];
    u.createdTS = inp[UserDBKeys.createdTS];

    return u;
  };

  updateData = (key: string, value: any) => {
    switch (key) {
      case UserDBKeys.aboutText:
        this.aboutText = value;
        break;
      case UserDBKeys.phoneNumber:
        this.phoneNumber = value;
        break;
      case UserDBKeys.imgUrl:
        this.imgUrl = value;
        break;
      case UserDBKeys.gender:
        this.gender = value;
        break;
      case UserDBKeys.dob:
        this.dob = value;
        break;
      case UserDBKeys.relDate:
        this.relDate = value;
        break;
      case UserDBKeys.interestedTags:
        this.interestedTags = value;
        break;
      default:
      // do nothing
    }
    return this;
  };

  updateBookmark = (productID: any, toDo: 'add' | 'remove') => {
    if (toDo === 'add') {
      this.bookmarks.push(productID);
    } else {
      this.bookmarks = this.bookmarks.filter(b => b !== productID);
    }

    return this;
  };
}

export default User;
