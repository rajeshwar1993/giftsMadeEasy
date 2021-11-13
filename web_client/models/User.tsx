import { Gender, MaritalStatus } from './enums';

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
  maritalStatus: MaritalStatus;
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
    this.maritalStatus = MaritalStatus.Unmarried;
    this.datesToRemember = [];
  }
}

export default User;
