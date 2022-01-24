export const UserDBKeys = {
  name: 'n',
  aboutText: 'ab',
  isAnonymous: 'ia',
  email: 'e',
  isEmailVerified: 'ev',
  phoneExt: 'pe',
  phoneNumber: 'pn',
  dob: 'dob',
  imgUrl: 'iu',
  gender: 'g',
  maritalStatus: 'ms',
  relDate: 'rd',
  interestedTags: 'it',
  wishlist: 'wl',
  bookmarks: 'bk',
  createdTS: 'cTS'
};

export const FilterDBKeys = {
  relationship: 'rt',
  occasion: 'ot',
  ageGrp: 'at',
  gender: 'gt',
  interests: 'it'
};

export const ProductDBKeys = {
  apid: 'apid',
  title: 't',
  productImgUrls: 'piu',
  rating: 'r',
  price: 'p',
  ogPrice: 'ogp',
  productUrl: 'su', // amazon server url
  affiliateUrl: 'au',
  overviewPoints: 'op',
  featureList: 'fl',
  occasionTags: 'ot',
  relationshipTags: 'rt',
  interestTags: 'it',
  genderTags: 'gt',
  ageTags: 'at',
  createdTS: 'cTS',
  status: 's',
  statusMessage: 'sm'
};

export const InterestTagDBKeys = {
  value: 'v',
  productCount: 'pc',
  userCount: 'uc',
  parentId: 'pid'
};

export const CircleUserDBKeys = {
  relation: 'rel',
  name: 'n'
};

export const NotificationDBKeys = {
  type: 't',
  redirectLink: 'rl',
  text: 't',
  read: 'r',
  createdTS: 'ts'
};
