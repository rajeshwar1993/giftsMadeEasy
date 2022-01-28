import { FilterDBKeys } from '../common/dbKeys';
import { Gender } from './enums';

class Filter {
  relationship: string;
  occasion: string;
  ageGrp: string;
  gender?: Array<Gender>;
  festivals: Array<string>;
  interests: Array<string>;

  constructor() {
    this.relationship = '';
    this.occasion = '';
    this.ageGrp = '';
    this.gender = [];
    this.interests = [];
    this.festivals = [];
  }

  convertToJson = () => ({
    [FilterDBKeys.relationship]: this.relationship,
    [FilterDBKeys.occasion]: this.occasion,
    [FilterDBKeys.ageGrp]: this.ageGrp,
    [FilterDBKeys.gender]: this.gender,
    [FilterDBKeys.interests]: this.interests,
    [FilterDBKeys.festivals]: this.festivals
  });

  static convertJsonToObj = (inp: any) => {
    let f = new Filter();
    f.relationship = inp[FilterDBKeys.relationship];
    f.occasion = inp[FilterDBKeys.occasion];
    f.ageGrp = inp[FilterDBKeys.ageGrp];
    f.gender = inp[FilterDBKeys.gender]
      ? Array.isArray(inp[FilterDBKeys.gender])
        ? inp[FilterDBKeys.gender]
        : [inp[FilterDBKeys.gender]]
      : [];
    f.interests = inp[FilterDBKeys.interests]
      ? Array.isArray(inp[FilterDBKeys.interests])
        ? inp[FilterDBKeys.interests]
        : [inp[FilterDBKeys.interests]]
      : [];
    f.festivals = inp[FilterDBKeys.festivals]
      ? Array.isArray(inp[FilterDBKeys.festivals])
        ? inp[FilterDBKeys.festivals]
        : [inp[FilterDBKeys.festivals]]
      : [];

    return f;
  };
}

export default Filter;
