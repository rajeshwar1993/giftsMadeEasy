export const ProductDBKeys = {
  apid: 'apid',
  desc: 'd',
  title: 't',
  productImgUrls: 'piu',
  rating: 'r',
  price: 'p',
  ogPrice: 'ogp',
  productUrl: 'su', // amazon server url
  affiliateUrl: 'au', // affiliate Url
  overviewPoints: 'op',
  featureList: 'fl',
  occasionTags: 'ot',
  festivalTags: 'ft',
  relationshipTags: 'rt',
  interestTags: 'it',
  genderTags: 'gt',
  ageTags: 'at',
  createdTS: 'cTS',
  status: 's',
  statusMessage: 'sm',
  source: 'sc',
  custom_score: 'cs'
};

export enum ProductStatus {
  Active = 'a', // show up in search results
  Hidden = 'h', // hidden from search results
  FetchPending = 'fp', // data fetch is pending
  FetchSuccess = 'fs',
  Error = 'e' // some error is caused. staus message updated
}
