import { ProductDBKeys } from '../common/dbKeys';
import { AgeGroup, Gender } from './enums';

class Prodcut {
  uid: string;
  apid: string; // amazom product id
  title: string;
  desc: string;
  rating: string;
  productImgUrls: Array<string>;
  price: string;
  ogPrice: string;
  productUrl: string;
  affiliateUrl: string;
  overviewPoints: Array<{
    key: string;
    val: string;
  }>;
  featureList: Array<string>;
  relationshipTags: Array<string>;
  occasionTags: Array<string>;
  interestTags: Array<string>;
  genderTags: Array<Gender>;
  ageTags: Array<string>;

  constructor() {
    this.uid = '';
    this.apid = '';
    this.title = '';
    this.desc = '';
    this.rating = '';
    this.productImgUrls = [];
    this.price = '';
    this.ogPrice = '';
    this.productUrl = '';
    this.affiliateUrl = '';
    this.overviewPoints = [];
    this.featureList = [];
    this.relationshipTags = [];
    this.occasionTags = [];
    this.interestTags = [];
    this.genderTags = [];
    this.ageTags = [];
  }

  convertToJson = () => ({
    [ProductDBKeys.apid]: this.apid,
    [ProductDBKeys.title]: this.title,
    [ProductDBKeys.desc]: this.desc,
    [ProductDBKeys.rating]: this.rating,
    [ProductDBKeys.price]: this.price,
    [ProductDBKeys.ogPrice]: this.ogPrice,
    [ProductDBKeys.productUrl]: this.productUrl,
    [ProductDBKeys.affiliateUrl]: this.affiliateUrl,
    [ProductDBKeys.featureList]: this.featureList,
    [ProductDBKeys.overviewPoints]: this.overviewPoints,
    [ProductDBKeys.relationshipTags]: this.relationshipTags,
    [ProductDBKeys.occasionTags]: this.occasionTags,
    [ProductDBKeys.interestTags]: this.interestTags,
    [ProductDBKeys.genderTags]: this.genderTags,
    [ProductDBKeys.ageTags]: this.ageTags
  });

  static convertJsonToObj = (inp: any, uid: string) => {
    let p = new Prodcut();
    p.uid = uid;
    p.apid = inp[ProductDBKeys.apid];
    p.title = inp[ProductDBKeys.title];
    p.rating = inp[ProductDBKeys.rating];
    p.desc = inp[ProductDBKeys.desc];
    p.price = inp[ProductDBKeys.price];
    p.ogPrice = inp[ProductDBKeys.ogPrice];
    p.productUrl = inp[ProductDBKeys.productUrl];
    p.affiliateUrl = inp[ProductDBKeys.affiliateUrl];
    p.overviewPoints = inp[ProductDBKeys.overviewPoints];
    p.featureList = inp[ProductDBKeys.featureList];
    p.relationshipTags = inp[ProductDBKeys.relationshipTags];
    p.occasionTags = inp[ProductDBKeys.occasionTags];
    p.interestTags = inp[ProductDBKeys.interestTags];
    p.genderTags = inp[ProductDBKeys.genderTags];
    p.ageTags = inp[ProductDBKeys.ageTags];

    return p;
  };
}

export default Prodcut;
