import { InterestGroups } from '../models/enums';

// Relationships
export const relationshipFilterValues = new Map<string, string>();

relationshipFilterValues.set('rel_gf', 'Girlfriend');
relationshipFilterValues.set('rel_bf', 'Boyfriend');
relationshipFilterValues.set('rel_f', 'Friend');
relationshipFilterValues.set('rel_h', 'Husband');
relationshipFilterValues.set('rel_w', 'Wife');
relationshipFilterValues.set('rel_s', 'Son');
relationshipFilterValues.set('rel_da', 'Daughter');
relationshipFilterValues.set('rel_br', 'Brother');
relationshipFilterValues.set('rel_si', 'Sister');
relationshipFilterValues.set('rel_fa', 'Father');
relationshipFilterValues.set('rel_mo', 'Mother');
relationshipFilterValues.set('rel_gr', 'Grandfather');
relationshipFilterValues.set('rel_gm', 'Grandmother');
relationshipFilterValues.set('rel_gm', 'Grandmother');
relationshipFilterValues.set('rel_col', 'Colleague');
relationshipFilterValues.set('rel_otr', 'Other');

// Age Groups
export const ageGrpFilterValues = new Map<string, string>();

ageGrpFilterValues.set('age_Inf', 'Infant (0-2)');
ageGrpFilterValues.set('age_Tod', 'Toddler (3-7)');
ageGrpFilterValues.set('age_Kid', 'Kid (8-12)');
ageGrpFilterValues.set('age_Teen', 'Teenager (13-17)');
ageGrpFilterValues.set('age_YA', 'Young Adult (18-22)');
ageGrpFilterValues.set('age_A', 'Adult (23-27)');
ageGrpFilterValues.set('age_RA', 'Responsible Adult (28-32)');
ageGrpFilterValues.set('age_S', 'Settled (33-40)');
ageGrpFilterValues.set('age_FS', 'Financially Settled (41-50)');
ageGrpFilterValues.set('age_AR', 'Approaching Retirement (51-60)');
ageGrpFilterValues.set('age_R', 'Retired (61-70)');
ageGrpFilterValues.set('age_W', 'Wisdom (71 & above)');

// Occasion
export const occasionFilterValues = new Map<string, string>();

occasionFilterValues.set('occ_a', 'Anniversary');
occasionFilterValues.set('occ_bs', 'Baby Shower');
occasionFilterValues.set('occ_bch', 'Bachelor/Bachelorette');
occasionFilterValues.set('occ_b', 'Birthday');
occasionFilterValues.set('occ_brh', 'Bridal Shower');
occasionFilterValues.set('occ_ce', 'Casual Event');
occasionFilterValues.set('occ_e', 'Engagement');
occasionFilterValues.set('occ_f', 'Farewell');
occasionFilterValues.set('occ_g', 'Graduation');
occasionFilterValues.set('occ_hw', 'House Warming');
occasionFilterValues.set('occ_p', 'Promotion');
occasionFilterValues.set('occ_ret', 'Retirement');
occasionFilterValues.set('occ_w', 'Wedding');
occasionFilterValues.set('occ_oto', 'Other');

// Festival
export const festivalilterValues = new Map<string, string>();

festivalilterValues.set('fes_mod', `Mother's Day`);
festivalilterValues.set('fes_fad', `Father's Day`);
festivalilterValues.set('fes_tcd', `Teacher's Day`);
festivalilterValues.set('fes_dad', `Daughter's Day`);
festivalilterValues.set('fes_vad', `Valentine's Day`);
festivalilterValues.set('fes_dw', `Diwali`);
festivalilterValues.set('fes_dus', `Dussehra`);
festivalilterValues.set('fes_eid', `Eid`);
festivalilterValues.set('fes_holi', `Holi`);
festivalilterValues.set('fes_ny', 'New Years');
festivalilterValues.set('fes_loh', 'Lohri');
festivalilterValues.set('fes_nav', `Navratri`);
festivalilterValues.set('fes_dur', `Durga Puja`);
festivalilterValues.set('fes_gan', `Ganesh Chaturthi`);
festivalilterValues.set('fes_ch', `Christmas`);
festivalilterValues.set('fes_on', `Onam`);
festivalilterValues.set('fes_bai', `Baisakhi`);
festivalilterValues.set('fes_eas', `Easter`);
festivalilterValues.set('fes_hal', `Halloween`);
festivalilterValues.set('fes_otf', `Other`);

// Interest Groups
export const interestGroupMap = new Map<number, string>();

interestGroupMap.set(
  InterestGroups.Electronics,
  'Electronic Gadgets, Computing & Gaming'
);
interestGroupMap.set(InterestGroups.ToysGamesAndSports, 'Toys, Games & Sports');
interestGroupMap.set(
  InterestGroups.NaturalAndHandMade,
  'Natural, Plants & Hand Made'
);
interestGroupMap.set(
  InterestGroups.HomeKitchenLiving,
  'Home, Kitchen & Living'
);
interestGroupMap.set(InterestGroups.ArtMusic, 'Stationery, Art and Music');
interestGroupMap.set(
  InterestGroups.MoviesTV,
  'Movies, TV Shows, Anime and Cartoons'
);
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
  name: 'Speakers and Audio Accesories',
  parent: InterestGroups.Electronics,
  desc: 'Home Theaters, Portable Speakers, Earphones, Headphones, Mics etc.'
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
interestFilterValues.set('el_appl', {
  name: 'Appliances',
  parent: InterestGroups.Electronics,
  desc: 'TV, Fridge and other home appliances.'
});

// Toys & Games
interestFilterValues.set('tgs_bdcdg', {
  name: 'Board & Card Games',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Monopoly, Uno, Ludo and all the classics.'
});
interestFilterValues.set('tgs_daf', {
  name: 'Dolls & Action Figures',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Barbies, G.I.Joe, Bobble Heads etc'
});
interestFilterValues.set('tgs_rct', {
  name: 'Remote Controlled Toys',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'RC Cars, Helicopters, Planes etc.'
});
interestFilterValues.set('tgs_edt', {
  name: 'Educational Toys',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'STEM and Informational Games.'
});
interestFilterValues.set('tgs_odg', {
  name: 'Outdoor Games & Sports',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Football, Badminton, Basketball etc.'
});
interestFilterValues.set('tgs_pbg', {
  name: 'Puzzles & Brain Games',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Crosswords, Picture puzzles etc.'
});
interestFilterValues.set('tgs_sft', {
  name: 'Soft Toys',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Teddy Bears, stuffed animals and Baby Pillows.'
});
interestFilterValues.set('tgs_tgc', {
  name: 'Toy Guns & Cars',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Hot Wheels, Nerf Guns and other Action Toys.'
});
interestFilterValues.set('tgs_apl', {
  name: 'Art and Playdough',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'Colouring Books, Kinetic Sand etc.'
});

interestFilterValues.set('tgs_aot', {
  name: 'All Other Toys',
  parent: InterestGroups.ToysGamesAndSports,
  desc: 'All other toys you can imagine!'
});

// Natural & Handmade
interestFilterValues.set('nah_pott', {
  name: 'Pottery',
  parent: InterestGroups.NaturalAndHandMade,
  desc: 'Ceramic, Pottery and other Artisanal Products.'
});
interestFilterValues.set('nah_pln', {
  name: 'Potted Plants & Seeds',
  parent: InterestGroups.NaturalAndHandMade,
  desc: 'Home or Office Plants and Seeds.'
});
interestFilterValues.set('nah_efnd', {
  name: 'Eco-Friendly',
  parent: InterestGroups.NaturalAndHandMade,
  desc: 'Anything and everything we feel is easy on the environment.'
});
interestFilterValues.set('nah_hndp', {
  name: 'Hand-made Products',
  parent: InterestGroups.NaturalAndHandMade,
  desc: 'All Handmade and natural products.'
});
interestFilterValues.set('nah_bmjt', {
  name: 'Bamboo & Jute',
  parent: InterestGroups.NaturalAndHandMade
});
interestFilterValues.set('nah_well', {
  name: 'Wellness',
  parent: InterestGroups.NaturalAndHandMade,
  desc: 'Physical and Mental Welness products.'
});

interestFilterValues.set('nah_fgcd', {
  name: 'Fragnance & Candles',
  parent: InterestGroups.NaturalAndHandMade,
  desc: 'Room Fragrances, Scented Candles and Room Ambience. '
});

// Home, Kitchen & Living

interestFilterValues.set('khl_whgc', {
  name: 'Wall Hangings & Clocks',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Wall Decoration, Clocks, Decals etc.'
});

interestFilterValues.set('khl_ctgl', {
  name: 'Cutlery & Glasswear',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Bowls, Spoons, Glasses and Tablewear.'
});

interestFilterValues.set('khl_bcta', {
  name: 'Bar and Cocktail Accessories',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Beer, Cocktail glasses and Bar Accessories.'
});

interestFilterValues.set('khl_kapll', {
  name: 'Kitchen Appliances',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Microwave, Mixers and other kitchen appliances.'
});
interestFilterValues.set('khl_spdi', {
  name: 'Showpiece & Display Items',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Idols, Decorative Items and Conversation Starters.'
});

interestFilterValues.set('khl_chpd', {
  name: 'Cute Home Products',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Items that make your home pop!'
});

interestFilterValues.set('khl_lplt', {
  name: 'Lamps & Lighting',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Desk Lamps, hanging lights and everything else that brightens your house.'
});

interestFilterValues.set('khl_bdcv', {
  name: 'Bedsheets, Covers etc',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Bedroom essentials - Pillow, sheets, blanket etc.'
});

interestFilterValues.set('khl_btpd', {
  name: 'Bath Products',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Towels, Mirrors, Soaps etc.'
});

interestFilterValues.set('khl_rafg', {
  name: 'Room Ambiance & Fragrance',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Room aromatics, Candles etc.'
});

interestFilterValues.set('khl_glgt', {
  name: 'Good Luck Gifts',
  parent: InterestGroups.HomeKitchenLiving,
  desc: 'Dreamcatchers, Feng Shui, Lucky Charm etc.'
});

// Art, Music
interestFilterValues.set('amc_sosp', {
  name: 'School and Office Stationery ',
  parent: InterestGroups.ArtMusic,
  desc: 'Pens, Pencils, Bags etc.'
});

interestFilterValues.set('amc_clasp', {
  name: 'Color and Art Supplies',
  parent: InterestGroups.ArtMusic,
  desc: 'Paints, Brushes, Canvas etc.'
});

interestFilterValues.set('amc_ptng', {
  name: 'Paintings & Posters',
  parent: InterestGroups.ArtMusic,
  desc: 'Wall paintings, posters and album art.'
});

interestFilterValues.set('amc_ptcl', {
  name: 'Pottery & Clay',
  parent: InterestGroups.ArtMusic,
  desc: 'Ceramics, Clay and Artisanal products.'
});

interestFilterValues.set('amc_mlint', {
  name: 'Musical Instruments',
  parent: InterestGroups.ArtMusic,
  desc: 'Guitar, Flute, Harmonicas etc.'
});

interestFilterValues.set('amc_mpvn', {
  name: 'Music Players & Vinyls',
  parent: InterestGroups.ArtMusic,
  desc: 'Carvaan, Walkman, Turntables etc.'
});

interestFilterValues.set('amc_bnd', {
  name: 'Popular Band Merchendise.',
  parent: InterestGroups.ArtMusic,
  desc: 'Products related to Iconic Bands like Beatles, Cold Play etc.'
});

// interestFilterValues.set('amc_bah', {
//   name: 'Bollywood & Hollywood Movies',
//   parent: InterestGroups.ArtMusicMovies
// });

// interestFilterValues.set('amc_tvsh', {
//   name: 'TV Shows',
//   parent: InterestGroups.ArtMusicMovies,
//   desc: 'Friends, The Office, Big Bang Theory etc.'
// });

// Movies and TV Shows
interestFilterValues.set('mtv_bwd', {
  name: 'Eveything Bollywood',
  parent: InterestGroups.MoviesTV,
  desc: 'Products related to Iconic Bollywood movies like Andaaz Apna Apna, Welcome etc.'
});

interestFilterValues.set('mtv_hwd', {
  name: 'Eveything Hollywood',
  parent: InterestGroups.MoviesTV,
  desc: 'Products related to Iconic Hollywood movies like The Godfather, Joker, Taxi Driver etc.'
});

interestFilterValues.set('mtv_tmu', {
  name: 'The Marvel Universe',
  parent: InterestGroups.MoviesTV,
  desc: 'Iron Man, Thor, Black Widow and the Avengers Assemble!'
});

interestFilterValues.set('mtv_tvsh', {
  name: 'Eveything TV Shows',
  parent: InterestGroups.MoviesTV,
  desc: 'Products related to Iconic TV Shows like Friends, The Office etc.'
});

interestFilterValues.set('mtv_ani', {
  name: 'The World of Anime',
  parent: InterestGroups.MoviesTV,
  desc: 'Products related to top Anime Series like Naruto, Death Note etc.'
});

interestFilterValues.set('mtv_ani', {
  name: 'Kids Shows & Animated Movies',
  parent: InterestGroups.MoviesTV,
  desc: 'Frozen, Dora, Peppa Pig, and classics like Tom and Jerry. '
});

// Books, Comics & Planners
interestFilterValues.set('bcp_bsbk', {
  name: 'Best Sellers',
  parent: InterestGroups.BooksComicsPlanners,
  desc: 'The Best Selling books accross categories.'
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

interestFilterValues.set('bcp_fnf', {
  name: 'Finance & Future',
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
  name: 'Tops, T-shirts, Shirts & Baby Clothes',
  parent: InterestGroups.ClothesFashionFootwear,
  desc: 'The Best Selling Clothing products.'
});

interestFilterValues.set('cff_facc', {
  name: 'Fashion Accessories',
  parent: InterestGroups.ClothesFashionFootwear,
  desc: 'Rings, Hairbands etc.'
});

interestFilterValues.set('cff_qqts', {
  name: 'Quirky and Quotes',
  parent: InterestGroups.ClothesFashionFootwear,
  desc: 'Bold and Eye-catchy fasion!'
});

interestFilterValues.set('cff_bpwt', {
  name: 'Bags, Purses & Wallets',
  parent: InterestGroups.ClothesFashionFootwear
});

interestFilterValues.set('cff_eyew', {
  name: 'Eyewear',
  parent: InterestGroups.ClothesFashionFootwear,
  desc: 'Glasses, Goggles and Shades.'
});

interestFilterValues.set('cff_mkpa', {
  name: 'Makeup & Accesories',
  parent: InterestGroups.ClothesFashionFootwear,
  desc: 'Makeup products, Grooming Kits and Skin Care.'
});

interestFilterValues.set('cff_jwel', {
  name: 'Jwellery',
  parent: InterestGroups.ClothesFashionFootwear,
  desc: 'The Bling!'
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
  name: 'Soap, Shampoo & Skin Care',
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
