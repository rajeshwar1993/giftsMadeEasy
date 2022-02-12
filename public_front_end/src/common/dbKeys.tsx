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
  interests: 'it',
  festivals: 'ft'
};

export const ProductDBKeys: { [key: string]: string } = {
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
  source: 'sc'
};

export const InterestTagDBKeys = {
  value: 'v',
  productCount: 'pc',
  userCount: 'uc',
  parentId: 'pid'
};

export const CircleUserDBKeys = {
  relation: 'rel',
  userCircle: 'uc',
  userAdded: 'ua',
  status: 's',
  createdTS: 'cTS'
};

export const NotificationDBKeys = {
  type: 't',
  redirectLink: 'rl',
  text: 't',
  read: 'r',
  createdTS: 'ts'
};

export const ContactDBKeys = {
  email: 'e',
  subject: 's',
  message: 'm',
  createdTS: 'ts'
};

export const InvitationsDBKeys = {
  fromID: 'fi',
  fromName: 'fn',
  toEmail: 'toe',
  createdTS: 'cTS'
};

export const ClientErrorLoggerDBKeys = {
  functionName: 'fn',
  fileName: 'fin',
  params: 'p',
  stack: 's',
  message: 'm',
  createdTS: 'cTS'
};
