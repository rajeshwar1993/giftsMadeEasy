import { ProductDBKeys } from '../helpers/dbKeys';
import { AgeGroup, Gender } from './enums';
import InterestTags from './Interest';

class Prodcut {
  uid: string;
  title: string;
  desc: string;
  productImgUrl: string;
  price: string;
  sourceUrl: string;
  affiliateUrl: string;
  interestTags: Array<InterestTags>;
  genderTags: Array<Gender>;
  ageTags: Array<AgeGroup>;

  constructor() {
    this.uid = '';
    this.title = '';
    this.desc = '';
    this.productImgUrl = '';
    this.price = '';
    this.sourceUrl = '';
    this.affiliateUrl = '';
    this.interestTags = [];
    this.genderTags = [];
    this.ageTags = [];
  }

  convertToJson = () => ({
    [ProductDBKeys.uid]: this.uid,
    [ProductDBKeys.title]: this.title,
    [ProductDBKeys.desc]: this.desc,
    [ProductDBKeys.price]: this.price,
    [ProductDBKeys.sourceUrl]: this.sourceUrl,
    [ProductDBKeys.affiliateUrl]: this.affiliateUrl,
    [ProductDBKeys.interestTags]: this.interestTags,
    [ProductDBKeys.genderTags]: this.genderTags,
    [ProductDBKeys.ageTags]: this.ageTags
  });

  static convertJsonToObj = (inp: any) => {
    let p = new Prodcut();
    p.uid = inp[ProductDBKeys.uid];
    p.title = inp[ProductDBKeys.title];
    p.desc = inp[ProductDBKeys.desc];
    p.price = inp[ProductDBKeys.price];
    p.sourceUrl = inp[ProductDBKeys.sourceUrl];
    p.affiliateUrl = inp[ProductDBKeys.affiliateUrl];
    p.interestTags = inp[ProductDBKeys.interestTags];
    p.genderTags = inp[ProductDBKeys.genderTags];
    p.ageTags = inp[ProductDBKeys.ageTags];

    return p;
  };
}

export default Prodcut;
