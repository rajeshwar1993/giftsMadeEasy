import { NewProductDBKeys, ProductDBKeys } from '../common/dbKeys';
import { AgeGroup, Gender } from './enums';

interface Product {
  uid: string;
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
  interestTags: Array<string>;
  genderTags: Array<Gender>;
  ageTags: Array<string>;
  createdTS: any;
}

export interface NewProduct extends Product {
  // extra properties

  tempName: string;
  status: 'pending' | 'success' | 'error';
  statusMessage: string;
}

export const convertProductToJson = (product: Product) => ({
  [ProductDBKeys.apid]: product.apid,
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
  [ProductDBKeys.interestTags]: product.interestTags,
  [ProductDBKeys.genderTags]: product.genderTags,
  [ProductDBKeys.ageTags]: product.ageTags
});

export const convertNewProductToJson = (newProduct: NewProduct) => {
  return {
    ...convertProductToJson(newProduct),
    [NewProductDBKeys.tempName]: newProduct.tempName,
    [NewProductDBKeys.status]: newProduct.status,
    [NewProductDBKeys.statusMessage]: newProduct.statusMessage
  };
};

export const convertProductJsonToObj = (inp: any, id: string) => {
  let p: Product = {
    uid: id,
    apid: inp[ProductDBKeys.apid] || '',
    title: inp[ProductDBKeys.title] || '',
    rating: inp[ProductDBKeys.rating] || '',
    price: inp[ProductDBKeys.price] || '',
    ogPrice: inp[ProductDBKeys.ogPrice] || '',
    productUrl: inp[ProductDBKeys.productUrl] || '',
    affiliateUrl: inp[ProductDBKeys.affiliateUrl] || '',
    overviewPoints: inp[ProductDBKeys.overviewPoints] || [],
    featureList: inp[ProductDBKeys.featureList] || [],
    relationshipTags: inp[ProductDBKeys.relationshipTags] || [],
    occasionTags: inp[ProductDBKeys.occasionTags] || [],
    interestTags: inp[ProductDBKeys.interestTags] || [],
    genderTags: inp[ProductDBKeys.genderTags] || [],
    ageTags: inp[ProductDBKeys.ageTags] || [],
    productImgUrls: inp[ProductDBKeys.productImgUrls] || [],
    createdTS: inp[ProductDBKeys.createdTS]
      ? inp[ProductDBKeys.createdTS].toDate().toISOString()
      : ''
  };
  return p;
};

export const convertNewProductJsonToObj = (inp: any, id: string) => {
  let np: NewProduct = {
    ...convertProductJsonToObj(inp, id),
    tempName: inp[NewProductDBKeys.tempName] || '',
    status: inp[NewProductDBKeys.status] || '',
    statusMessage: inp[NewProductDBKeys.statusMessage] || ''
  };

  return np;
};

export default Product;
