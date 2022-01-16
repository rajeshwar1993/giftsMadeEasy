import { UserDBKeys } from '../common/dbKeys';
import { Gender } from './enums';

export interface UserType {
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

export const convertUserToJson = (user: UserType) => ({
  [UserDBKeys.name]: user.name,
  [UserDBKeys.aboutText]: user.aboutText,
  [UserDBKeys.isAnonymous]: user.isAnonymous,
  [UserDBKeys.email]: user.email,
  [UserDBKeys.isEmailVerified]: user.isEmailVerified,
  [UserDBKeys.phoneExt]: user.phoneExt,
  [UserDBKeys.phoneNumber]: user.phoneNumber,
  [UserDBKeys.dob]: user.dob,
  [UserDBKeys.imgUrl]: user.imgUrl,
  [UserDBKeys.gender]: user.gender.toString(),
  [UserDBKeys.relDate]: user.relDate.toString(),
  [UserDBKeys.interestedTags]: user.interestedTags,
  [UserDBKeys.wishlist]: user.wishlist,
  [UserDBKeys.bookmarks]: user.bookmarks
});

export const convertUserJsonToObj = (inp: any, id: string) => {
  let u: UserType = {
    uid: id,
    name: inp[UserDBKeys.name] || '',
    aboutText: inp[UserDBKeys.aboutText] || '',
    isAnonymous: inp[UserDBKeys.isAnonymous] || '',
    email: inp[UserDBKeys.email] || '',
    isEmailVerified: inp[UserDBKeys.isEmailVerified] || '',
    phoneExt: inp[UserDBKeys.phoneExt] || '',
    phoneNumber: inp[UserDBKeys.phoneNumber] || '',
    dob: inp[UserDBKeys.dob] || '',
    imgUrl: inp[UserDBKeys.imgUrl] || '',
    gender:
      inp[UserDBKeys.gender] === Gender.Female.toString()
        ? Gender.Female
        : Gender.Male,
    relDate: inp[UserDBKeys.relDate] || '',
    interestedTags: inp[UserDBKeys.interestedTags] || [],
    wishlist: inp[UserDBKeys.wishlist] || [],
    bookmarks: inp[UserDBKeys.bookmarks] || [],
    createdTS: inp[UserDBKeys.createdTS]
      ? inp[UserDBKeys.createdTS].toDate().toISOString()
      : ''
  };

  return u;
};

export const updateUserData = (user: UserType, key: string, value: any) => {
  switch (key) {
    case UserDBKeys.name:
      user.name = value;
      break;
    case UserDBKeys.aboutText:
      user.aboutText = value;
      break;
    case UserDBKeys.phoneNumber:
      user.phoneNumber = value;
      break;
    case UserDBKeys.imgUrl:
      user.imgUrl = value;
      break;
    case UserDBKeys.gender:
      user.gender = value;
      break;
    case UserDBKeys.dob:
      user.dob = value;
      break;
    case UserDBKeys.relDate:
      user.relDate = value;
      break;
    case UserDBKeys.interestedTags:
      user.interestedTags = value;
      break;
    default:
    // do nothing
  }
  return user;
};

export const updateUserBookmark = (
  user: UserType,
  productID: any,
  toDo: 'add' | 'remove'
) => {
  if (toDo === 'add') {
    user.bookmarks.push(productID);
  } else {
    user.bookmarks = user.bookmarks.filter(b => b !== productID);
  }

  return user;
};
export const updateUserWishlist = (
  user: UserType,
  productID: any,
  toDo: 'add' | 'remove'
) => {
  if (toDo === 'add') {
    user.wishlist.push(productID);
  } else {
    user.wishlist = user.wishlist.filter(b => b !== productID);
  }

  return user;
};

// class User {
//   uid: string;
//   name: string;
//   aboutText: string;
//   isAnonymous: boolean;
//   email: string;
//   isEmailVerified: boolean;
//   phoneExt: string;
//   phoneNumber: string;
//   dob: string;
//   imgUrl: string;
//   gender: Gender;
//   relDate: string; // relationship date
//   interestedTags: Array<string>; // array of interstTag ids
//   wishlist: Array<string>;
//   bookmarks: Array<string>;
//   createdTS: any;

//   constructor() {
//     this.uid = '';
//     this.name = '';
//     this.aboutText = '';
//     this.isAnonymous = false;
//     this.email = '';
//     this.isEmailVerified = false;
//     this.phoneExt = '+91';
//     this.phoneNumber = '';
//     this.dob = '';
//     this.imgUrl = '';
//     this.gender = Gender.Female;
//     this.relDate = '';
//     this.interestedTags = [];
//     this.wishlist = [];
//     this.bookmarks = [];
//     this.createdTS = serverTimestamp();
//   }

//   convertToJson = () => ({
//     [UserDBKeys.name]: this.name,
//     [UserDBKeys.aboutText]: this.aboutText,
//     [UserDBKeys.isAnonymous]: this.isAnonymous,
//     [UserDBKeys.email]: this.email,
//     [UserDBKeys.isEmailVerified]: this.isEmailVerified,
//     [UserDBKeys.phoneExt]: this.phoneExt,
//     [UserDBKeys.phoneNumber]: this.phoneNumber,
//     [UserDBKeys.dob]: this.dob,
//     [UserDBKeys.imgUrl]: this.imgUrl,
//     [UserDBKeys.gender]: this.gender.toString(),
//     [UserDBKeys.relDate]: this.relDate.toString(),
//     [UserDBKeys.interestedTags]: this.interestedTags,
//     [UserDBKeys.wishlist]: this.wishlist,
//     [UserDBKeys.bookmarks]: this.bookmarks,
//     [UserDBKeys.createdTS]: this.createdTS
//   });

//   static convertJsonToObj = (inp: any, id: string) => {
//     let u = new User();
//     u.uid = id;
//     u.name = inp[UserDBKeys.name];
//     u.aboutText = inp[UserDBKeys.aboutText];
//     u.isAnonymous = inp[UserDBKeys.isAnonymous];
//     u.email = inp[UserDBKeys.email];
//     u.isEmailVerified = inp[UserDBKeys.isEmailVerified];
//     u.phoneExt = inp[UserDBKeys.phoneExt];
//     u.phoneNumber = inp[UserDBKeys.phoneNumber];
//     u.dob = inp[UserDBKeys.dob];
//     u.imgUrl = inp[UserDBKeys.imgUrl];
//     u.gender =
//       inp[UserDBKeys.gender] === Gender.Female.toString()
//         ? Gender.Female
//         : Gender.Male;
//     u.relDate = inp[UserDBKeys.relDate];
//     u.interestedTags = inp[UserDBKeys.interestedTags];
//     u.wishlist = inp[UserDBKeys.wishlist] || [];
//     u.bookmarks = inp[UserDBKeys.bookmarks] || [];
//     u.createdTS = inp[UserDBKeys.createdTS];

//     return u;
//   };

//   updateData = (key: string, value: any) => {
//     switch (key) {
//       case UserDBKeys.aboutText:
//         this.aboutText = value;
//         break;
//       case UserDBKeys.phoneNumber:
//         this.phoneNumber = value;
//         break;
//       case UserDBKeys.imgUrl:
//         this.imgUrl = value;
//         break;
//       case UserDBKeys.gender:
//         this.gender = value;
//         break;
//       case UserDBKeys.dob:
//         this.dob = value;
//         break;
//       case UserDBKeys.relDate:
//         this.relDate = value;
//         break;
//       case UserDBKeys.interestedTags:
//         this.interestedTags = value;
//         break;
//       default:
//       // do nothing
//     }
//     return this;
//   };

//   updateBookmark = (productID: any, toDo: 'add' | 'remove') => {
//     if (toDo === 'add') {
//       this.bookmarks.push(productID);
//     } else {
//       this.bookmarks = this.bookmarks.filter(b => b !== productID);
//     }

//     return this;
//   };
// }

export default UserType;
