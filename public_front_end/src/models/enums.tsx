export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export enum AgeGroup {
  Infant = 'Infant (0-2)',
  Toddler = 'Toddler (3-7)',
  Kid = 'Kid (8-12)',
  Teenager = 'Teenager (13-17)',
  YoungAdult = 'Young Adult (18-22)',
  Adult = 'Adult (23-27)',
  ResponsibleAdult = 'Responsible Adult (28-32)',
  Settled = 'Settled (33-40)',
  FinanciallySettled = 'Financially Settled (41-50)',
  ApproachingRetirement = 'Approaching Retirement (51-60)',
  Retired = 'Retired (61-70)',
  Wisdom = 'Wisdom (71 and above)'
}

export enum Relationship {
  Girlfriend = 'Girlfriend',
  Boyfriend = 'Boyfriend',
  Friend = 'Friend',
  Husband = 'Husband',
  Wife = 'Wife',
  Son = 'Son',
  Daughter = 'Daughter',
  Brother = 'Brother',
  Sister = 'Sister',
  Father = 'Father',
  Mother = 'Mother',
  Grandfather = 'Grandfather',
  Grandmother = 'Grandmother',
  Colleague = 'Colleague',
  Other = 'Other'
}

export enum Occasion {
  Birthday = 'b',
  Anniversary = 'a',
  Wedding = 'w',
  HouseWarming = 'hw'
}

export enum Festivals {
  NewYears = 'ny',
  Lohri = 'loh',
  RepublicDay = 'rpd',
  ValentinesDay = 'vd',
  Holi = 'holi'
}

export enum NotificationTypes {
  FirstRegister = 'FS',
  CompleteProfile = 'CP',
  CircleRequestSent = 'CRS',
  CircleRequestAccepted = 'CRA',
  UpcommingDate = 'UD',
  AddInviteeToCircle = 'AITC',
  AddThisInvitedPersonToCircle = 'ATIPTC'
}

export enum ProductStatus {
  Active = 'a', // show up in search results
  Hidden = 'h', // hidden from search results
  FetchPending = 'fp', // data fetch is pending
  FetchSuccess = 'fs',
  Error = 'e' // some error is caused. staus message updated
}

export enum InterestGroups {
  Electronics = 1,
  ToysGamesAndSports = 2,
  NaturalAndHandMade = 3,
  HomeKitchenLiving = 4,
  ArtMusicMovies = 5,
  ClothesFashionFootwear = 6,
  BooksComicsPlanners = 7,
  BeautyBathSelfGrooming = 8
}
