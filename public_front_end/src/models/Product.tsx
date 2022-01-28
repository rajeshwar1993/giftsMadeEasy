import { ProductDBKeys } from '../common/dbKeys';
import { Gender, ProductStatus } from './enums';

interface Product {
  uid: string;
  desc: string;
  apid: string; // amazom product id
  title: string;
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
  festivalTags: Array<string>;
  interestTags: Array<string>;
  genderTags: Array<Gender>;
  ageTags: Array<string>;
  createdTS: any;

  // extra properties
  status: ProductStatus;
  statusMessage: Array<string>;
}

export const convertProductToJson = (product: Product) => ({
  [ProductDBKeys.apid]: product.apid,
  [ProductDBKeys.desc]: product.desc,
  [ProductDBKeys.title]: product.title,
  [ProductDBKeys.rating]: product.rating,
  [ProductDBKeys.price]: product.price,
  [ProductDBKeys.ogPrice]: product.ogPrice,
  [ProductDBKeys.productUrl]: product.productUrl,
  [ProductDBKeys.affiliateUrl]: product.affiliateUrl,
  [ProductDBKeys.featureList]: product.featureList,
  [ProductDBKeys.overviewPoints]: product.overviewPoints,
  [ProductDBKeys.relationshipTags]: product.relationshipTags,
  [ProductDBKeys.occasionTags]: product.occasionTags,
  [ProductDBKeys.festivalTags]: product.festivalTags,
  [ProductDBKeys.interestTags]: product.interestTags,
  [ProductDBKeys.genderTags]: product.genderTags,
  [ProductDBKeys.ageTags]: product.ageTags,
  [ProductDBKeys.productImgUrls]: product.productImgUrls,
  [ProductDBKeys.status]: product.status,
  [ProductDBKeys.statusMessage]: product.statusMessage
});

export const convertProductJsonToObj = (inp: any, id: string) => {
  let p: Product = {
    uid: id,
    apid: inp[ProductDBKeys.apid] || '',
    title: inp[ProductDBKeys.title] || '',
    desc: inp[ProductDBKeys.desc] || '',
    rating: inp[ProductDBKeys.rating] || '',
    price: inp[ProductDBKeys.price] || '',
    ogPrice: inp[ProductDBKeys.ogPrice] || '',
    productUrl: inp[ProductDBKeys.productUrl] || '',
    affiliateUrl: inp[ProductDBKeys.affiliateUrl] || '',
    overviewPoints: inp[ProductDBKeys.overviewPoints] || [],
    featureList: inp[ProductDBKeys.featureList] || [],
    relationshipTags: inp[ProductDBKeys.relationshipTags] || [],
    occasionTags: inp[ProductDBKeys.occasionTags] || [],
    festivalTags: inp[ProductDBKeys.festivalTags] || [],
    interestTags: inp[ProductDBKeys.interestTags] || [],
    genderTags: inp[ProductDBKeys.genderTags] || [],
    ageTags: inp[ProductDBKeys.ageTags] || [],
    productImgUrls: inp[ProductDBKeys.productImgUrls] || [],
    createdTS: inp[ProductDBKeys.createdTS] || '',
    status: inp[ProductDBKeys.status] || '',
    statusMessage: inp[ProductDBKeys.statusMessage] || []
  };
  return p;
};

export default Product;
