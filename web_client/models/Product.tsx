import { Gender } from './enums';

class Prodcut {
  uid: string;
  title: string;
  desc: string;
  productImgUrl: string;
  price: string;
  sourceUrl: string;
  affiliate: string;
  interestTags: Array<string>;
  genderTags: Array<Gender>;
  ageTags: Array<string>;

  constructor() {
    this.uid = '';
    this.title = '';
    this.desc = '';
    this.productImgUrl = '';
    this.price = '';
    this.sourceUrl = '';
    this.affiliate = '';
    this.interestTags = [];
    this.genderTags = [];
    this.ageTags = [];
  }
}
