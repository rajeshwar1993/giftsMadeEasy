import { FilterDBKeys } from '../common/dbKeys';
import { AgeGroup, Gender } from './enums';

class Filter {
  relationship: string;
  occasion: string;
  ageGrp: Array<AgeGroup>;
  gender?: Array<Gender>;
  interests: Array<string>;

  constructor() {
    this.relationship = '';
    this.occasion = '';
    this.ageGrp = [];
    this.gender = [];
    this.interests = [];
  }

  convertToJson = () => ({
    [FilterDBKeys.relationship]: this.relationship,
    [FilterDBKeys.occasion]: this.occasion,
    [FilterDBKeys.ageGrp]: this.ageGrp,
    [FilterDBKeys.gender]: this.gender || [],
    [FilterDBKeys.interests]: this.interests
  });

  static convertJsonToObj = (inp: any) => {
    let f = new Filter();
    f.relationship = inp[FilterDBKeys.relationship];
    f.occasion = inp[FilterDBKeys.occasion];
    f.ageGrp = inp[FilterDBKeys.ageGrp];
    f.gender = inp[FilterDBKeys.gender] || [];
    f.interests = inp[FilterDBKeys.interests];

    return f;
  };
}

export default Filter;
