import { Gender } from './enums';

class Filter {
  relationship: string;
  occasion: string;
  ageGrp: Array<string>;
  gender?: Gender;
  interests: Array<string>;

  constructor() {
    this.relationship = '';
    this.occasion = '';
    this.ageGrp = [];
    this.gender = undefined;
    this.interests = [];
  }
}

export default Filter;
