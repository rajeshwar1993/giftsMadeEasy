import { InterestGroups } from '../models/enums';

// Relationships
export const relationshipFilterValues = new Map<string, string>();

relationshipFilterValues.set('gf', 'Girlfriend');
relationshipFilterValues.set('bf', 'Boyfriend');
relationshipFilterValues.set('f', 'Friend');
relationshipFilterValues.set('h', 'Husband');
relationshipFilterValues.set('w', 'Wife');
relationshipFilterValues.set('s', 'Son');
relationshipFilterValues.set('da', 'Daughter');
relationshipFilterValues.set('br', 'Brother');
relationshipFilterValues.set('si', 'Sister');
relationshipFilterValues.set('fa', 'Father');
relationshipFilterValues.set('mo', 'Mother');
relationshipFilterValues.set('gr', 'Grandfather');
relationshipFilterValues.set('gm', 'Grandmother');
relationshipFilterValues.set('gm', 'Grandmother');
relationshipFilterValues.set('col', 'Colleague');
relationshipFilterValues.set('otr', 'Other');

// Age Groups
export const ageGrpFilterValues = new Map<string, string>();

ageGrpFilterValues.set('Inf', 'Infant (0-2)');
ageGrpFilterValues.set('Tod', 'Toddler (3-7)');
ageGrpFilterValues.set('Kid', 'Kid (8-12)');
ageGrpFilterValues.set('Teen', 'Teenager (13-17)');
ageGrpFilterValues.set('YA', 'Young Adult (18-22)');
ageGrpFilterValues.set('A', 'Adult (23-27)');
ageGrpFilterValues.set('RA', 'Responsible Adult (28-32)');
ageGrpFilterValues.set('S', 'Settled (33-40)');
ageGrpFilterValues.set('FS', 'Financially Settled (41-50)');
ageGrpFilterValues.set('AR', 'Approaching Retirement (51-60)');
ageGrpFilterValues.set('R', 'Retired (61-70)');
ageGrpFilterValues.set('W', 'Wisdom (71 & above)');

// Occasion
export const occasionFilterValues = new Map<string, string>();

occasionFilterValues.set('a', 'Anniversary');
occasionFilterValues.set('bs', 'Baby Shower');
occasionFilterValues.set('bch', 'Bachelor/Bachelorette');
occasionFilterValues.set('b', 'Birthday');
occasionFilterValues.set('brh', 'Bridal Shower');
occasionFilterValues.set('ce', 'Casual Event');
occasionFilterValues.set('e', 'Engagement');
occasionFilterValues.set('f', 'Farewell');
occasionFilterValues.set('g', 'Graduation');
occasionFilterValues.set('hw', 'House Warming');
occasionFilterValues.set('p', 'Promotion');
occasionFilterValues.set('w', 'Wedding');
occasionFilterValues.set('oto', 'Other');

// Festival
export const festivalilterValues = new Map<string, string>();

festivalilterValues.set('vd', `Valentine's Day`);
festivalilterValues.set('dw', `Diwali`);
festivalilterValues.set('dus', `Dussehra`);
festivalilterValues.set('eid', `Eid`);
festivalilterValues.set('holi', `Holi`);
festivalilterValues.set('ny', 'New Years');
festivalilterValues.set('loh', 'Lohri');
festivalilterValues.set('nav', `Navratri`);
festivalilterValues.set('dur', `Durga Puja`);
festivalilterValues.set('gan', `Ganesh Chaturthi`);
festivalilterValues.set('ch', `Christmas`);
festivalilterValues.set('on', `Onam`);
festivalilterValues.set('bai', `Baisakhi`);
festivalilterValues.set('eas', `Easter`);
festivalilterValues.set('hal', `Halloween`);
festivalilterValues.set('otf', `Other`);

// Interest Groups
export const interestGroupMap = new Map<number, string>();

interestGroupMap.set(InterestGroups.Electronics, 'Electronics & Gadgets');
interestGroupMap.set(InterestGroups.ToysGamesAndSports, 'Toys, Games & Sports');
interestGroupMap.set(InterestGroups.NaturalAndHandMade, 'Natural & Hand Made');
interestGroupMap.set(
  InterestGroups.HomeKitchenLiving,
  'Home, Kitchen & Living'
);
interestGroupMap.set(InterestGroups.ArtMusicMovies, 'Art & Creativity');
interestGroupMap.set(
  InterestGroups.ClothesFashionFootwear,
  'Clothes, Fashion & Footwear'
);
interestGroupMap.set(
  InterestGroups.BeautyBathSelfGrooming,
  'Beauty & Self Grooming'
);
interestGroupMap.set(
  InterestGroups.BooksComicsPlanners,
  'Books, Comics & Diary'
);

// Interests
export const interestFilterValues = new Map<
  string,
  { name: string; parent: number; desc?: string }
>();

// Electronics
interestFilterValues.set('el_bfgeg', {
  name: 'Best for Gifting',
  parent: InterestGroups.Electronics,
  desc: 'Our top choice of gadgets best for gifting.'
});

interestFilterValues.set('el_smph', {
  name: 'Smartphones',
  parent: InterestGroups.Electronics
});

interestFilterValues.set('el_lpt', {
  name: 'Laptops & Accessories',
  parent: InterestGroups.Electronics,
  desc: 'Laptops, Desktops & computing peripherals.'
});

interestFilterValues.set('el_tab', {
  name: 'Tablets',
  parent: InterestGroups.Electronics
});

interestFilterValues.set('el_camac', {
  name: 'Cameras & Accessories',
  parent: InterestGroups.Electronics,
  desc: 'Cameras, stands, gimbals, camera lights & more.'
});

interestFilterValues.set('el_spear', {
  name: 'Spreakers & Earphones',
  parent: InterestGroups.Electronics
});

interestFilterValues.set('el_wede', {
  name: 'Wearable Devices',
  parent: InterestGroups.Electronics,
  desc: 'Smartwatches, fitness trackers & more.'
});

interestFilterValues.set('el_smhd', {
  name: 'Smart Home Devices',
  parent: InterestGroups.Electronics,
  desc: 'Smart bulbs, smart switches, speakers & so much more.'
});

interestFilterValues.set('el_gmac', {
  name: 'Gaming & Accessories',
  parent: InterestGroups.Electronics,
  desc: 'Latest games, controllers, monitors & more.'
});

// Toys & Games
interestFilterValues.set('tgs_bdcdg', {
  name: 'Board & Card Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_daf', {
  name: 'Dolls & Action Figures',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_rct', {
  name: 'Radio Controlled Toys',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_edt', {
  name: 'Educational Toys',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_odg', {
  name: 'Outdoor Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_pbg', {
  name: 'Puzzles & Brain Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_sft', {
  name: 'Soft Toys',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_tgc', {
  name: 'Toy Guns & Cars',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('tgs_apl', {
  name: 'Art and Playdough',
  parent: InterestGroups.ToysGamesAndSports
});

interestFilterValues.set('tgs_aot', {
  name: 'All Other Toys',
  parent: InterestGroups.ToysGamesAndSports
});

// Natural & Handmade
interestFilterValues.set('nah_pott', {
  name: 'Pottery',
  parent: InterestGroups.NaturalAndHandMade
});
interestFilterValues.set('nah_pln', {
  name: 'Plants',
  parent: InterestGroups.NaturalAndHandMade
});
interestFilterValues.set('nah_efnd', {
  name: 'Eco-Friendly',
  parent: InterestGroups.NaturalAndHandMade
});
interestFilterValues.set('nah_hndp', {
  name: 'Hand-made Products',
  parent: InterestGroups.NaturalAndHandMade
});
interestFilterValues.set('nah_bmjt', {
  name: 'Bamboo & Jute',
  parent: InterestGroups.NaturalAndHandMade
});
interestFilterValues.set('nah_well', {
  name: 'Wellness',
  parent: InterestGroups.NaturalAndHandMade
});

interestFilterValues.set('nah_fgcd', {
  name: 'Fragnance & Candles',
  parent: InterestGroups.NaturalAndHandMade
});

// Home, Kitchen & Living

interestFilterValues.set('khl_whgc', {
  name: 'Wall Hangings & Clocks',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_ctgl', {
  name: 'Cutlery & Glasswear',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_spdi', {
  name: 'Showpiece & Display Items',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_chpd', {
  name: 'Cute Home Products',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_lplt', {
  name: 'Lamps & Lighting',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_bdcv', {
  name: 'Bedsheets & Covers',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_btpd', {
  name: 'Bath Products',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_rafg', {
  name: 'Room Ambiance & Fragrance',
  parent: InterestGroups.HomeKitchenLiving
});

interestFilterValues.set('khl_glgt', {
  name: 'Good Luck Gifts',
  parent: InterestGroups.HomeKitchenLiving
});

// Art, Music & Movies
interestFilterValues.set('amc_clasp', {
  name: 'Color and Art Supplies',
  parent: InterestGroups.ArtMusicMovies
});

interestFilterValues.set('amc_ptng', {
  name: 'Paintings',
  parent: InterestGroups.ArtMusicMovies
});

interestFilterValues.set('amc_ptcl', {
  name: 'Pottery & Clay',
  parent: InterestGroups.ArtMusicMovies
});

interestFilterValues.set('amc_mlint', {
  name: 'Musical Instruments',
  parent: InterestGroups.ArtMusicMovies
});

interestFilterValues.set('amc_mpvn', {
  name: 'Music Players & Vinyls',
  parent: InterestGroups.ArtMusicMovies
});

interestFilterValues.set('amc_bah', {
  name: 'Bollywood & Hollywood',
  parent: InterestGroups.ArtMusicMovies
});

// Books, Comics & Planners
interestFilterValues.set('bcp_bsbk', {
  name: 'Best Sellers',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_fift', {
  name: 'Fiction & Fantasy',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_mysp', {
  name: 'Mystry & Suspence',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_ptrm', {
  name: 'Poetry & Romance',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_bmhs', {
  name: 'Biography, Memoir & History',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_shmt', {
  name: 'Self-help & Motivational',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_cmgn', {
  name: 'Comics & Graphic Novels',
  parent: InterestGroups.BooksComicsPlanners
});

interestFilterValues.set('bcp_dplr', {
  name: 'Diaries & Planners',
  parent: InterestGroups.BooksComicsPlanners
});

// Clother, Fashion & Footwear

interestFilterValues.set('cff_ttsh', {
  name: 'Tops, T-shirts & Shirts',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_facc', {
  name: 'Fashion Accessories',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_qqts', {
  name: 'Quirky and Quotes',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_bpwt', {
  name: 'Bags, Purses & Wallets',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_eyew', {
  name: 'Eyewear',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_jwel', {
  name: 'Jwellery',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_slfl', {
  name: 'Shoes, Loafers & Flipflops',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_scmf', {
  name: 'Scarfs & Mufflers',
  parent: InterestGroups.ClothesFashionFootwear
});

// Beauty, Bath & Self Grooming

interestFilterValues.set('bbsg_mkpa', {
  name: 'Makeup & Accesories',
  parent: InterestGroups.BeautyBathSelfGrooming
});

interestFilterValues.set('bbsg_ssbp', {
  name: 'Soap, Shampoo & Bath Products',
  parent: InterestGroups.BeautyBathSelfGrooming
});

interestFilterValues.set('bbsg_hpac', {
  name: 'Hair Products & Accesories',
  parent: InterestGroups.BeautyBathSelfGrooming
});

interestFilterValues.set('bbsg_sgp', {
  name: 'Shaving & Grooming Products',
  parent: InterestGroups.BeautyBathSelfGrooming
});

interestFilterValues.set('bbsg_fgpr', {
  name: 'Fragrance & Perfumes',
  parent: InterestGroups.BeautyBathSelfGrooming
});

interestFilterValues.set('bbsg_edp', {
  name: 'Edible Products',
  parent: InterestGroups.BeautyBathSelfGrooming
});
