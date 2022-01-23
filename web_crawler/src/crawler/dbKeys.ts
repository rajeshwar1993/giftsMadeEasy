export const ProductDBKeys = {
  apid: 'apid',
  title: 't',
  productImgUrls: 'piu',
  rating: 'r',
  price: 'p',
  ogPrice: 'ogp',
  productUrl: 'su',
  affiliateUrl: 'au',
  overviewPoints: 'op',
  featureList: 'fl',
  occasionTags: 'ot',
  relationshipTags: 'rt',
  interestTags: 'it',
  genderTags: 'gt',
  ageTags: 'at',
  status: 's',
  statusMessage: 'sm'
};

export enum ProductStatus {
  Active = 'a', // show up in search results
  Hidden = 'h', // hidden from search results
  FetchPending = 'fp', // data fetch is pending
  FetchSuccess = 'fs',
  Error = 'e' // some error is caused. staus message updated
}
