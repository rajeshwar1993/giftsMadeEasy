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

occasionFilterValues.set('b', 'Birthday');
occasionFilterValues.set('a', 'Anniversary');
occasionFilterValues.set('w', 'Wedding');
occasionFilterValues.set('e', 'Engagement');
occasionFilterValues.set('bs', 'Baby Shower');
occasionFilterValues.set('g', 'Graduation');
occasionFilterValues.set('p', 'Promotion');
occasionFilterValues.set('f', 'Farewell');
occasionFilterValues.set('hw', 'House Warming');
occasionFilterValues.set('ce', 'Casual Event');
occasionFilterValues.set('brh', 'Bridal Shower');
occasionFilterValues.set('bch', 'Bachelor/Bachelorette');

// Festival
export const festivalilterValues = new Map<string, string>();

festivalilterValues.set('ny', 'New Years');
festivalilterValues.set('loh', 'Lohri');
festivalilterValues.set('rpd', 'Republic Day');
festivalilterValues.set('vd', `Valentine's Day`);
festivalilterValues.set('holi', `Holi`);
festivalilterValues.set('nav', `Navratri`);
festivalilterValues.set('dur', `Durga Puja`);
festivalilterValues.set('dus', `Dussehra`);
festivalilterValues.set('eid', `Eid`);
festivalilterValues.set('gan', `Ganesh Chaturthi`);
festivalilterValues.set('ch', `Christmas`);
festivalilterValues.set('dw', `Diwali`);
festivalilterValues.set('on', `Onam`);
festivalilterValues.set('bai', `Baisakhi`);
festivalilterValues.set('eas', `Easter`);
festivalilterValues.set('hal', `Halloween`);

// Interest Groups
export const interestGroupMap = new Map<number, string>();

interestGroupMap.set(InterestGroups.Electronics, 'Electronics & Gadgets');
interestGroupMap.set(InterestGroups.ToysGamesAndSports, 'Toys, Games & Sports');
interestGroupMap.set(InterestGroups.NaturalAndHandMade, 'Natural & Hand Made');
interestGroupMap.set(
  InterestGroups.HomeDecorAndKitchen,
  'Home Decor & Kitchen'
);
interestGroupMap.set(InterestGroups.ArtAndCreativity, 'Art & Creativity');
interestGroupMap.set(
  InterestGroups.ClothesFashionFootwear,
  'Clothes, Fashion & Footwear'
);
interestGroupMap.set(
  InterestGroups.BeautyAndSelfGrooming,
  'Beauty & Self Grooming'
);
interestGroupMap.set(
  InterestGroups.BooksComicsAndDiaries,
  'Books, Comics & Diary'
);

// Interests
export const interestFilterValues = new Map<
  string,
  { name: string; parent: number; desc?: string }
>();

// Electronics
interestFilterValues.set('bfgeg', {
  name: 'Best for Gifting',
  parent: InterestGroups.Electronics,
  desc: 'Our top choice of gadgets best for gifting.'
});

interestFilterValues.set('smph', {
  name: 'Smartphones',
  parent: InterestGroups.Electronics
});

interestFilterValues.set('lpt', {
  name: 'Laptops & Accessories',
  parent: InterestGroups.Electronics,
  desc: 'Laptops, Desktops & computing peripherals.'
});

interestFilterValues.set('tab', {
  name: 'Tablets',
  parent: InterestGroups.Electronics
});

interestFilterValues.set('camac', {
  name: 'Cameras & Accessories',
  parent: InterestGroups.Electronics,
  desc: 'Cameras, stands, gimbals, camera lights & more.'
});

interestFilterValues.set('spear', {
  name: 'Spreakers & Earphones',
  parent: InterestGroups.Electronics
});

interestFilterValues.set('wede', {
  name: 'Wearable Devices',
  parent: InterestGroups.Electronics,
  desc: 'Smartwatches, fitness trackers & more.'
});

interestFilterValues.set('smhd', {
  name: 'Smart Home Devices',
  parent: InterestGroups.Electronics,
  desc: 'Smart bulbs, smart switches, speakers & so much more.'
});

interestFilterValues.set('gmac', {
  name: 'Gaming & Accessories',
  parent: InterestGroups.Electronics,
  desc: 'Latest games, controllers, monitors & more.'
});

// Toys & Games
interestFilterValues.set('rct', {
  name: 'Radio Controlled Toys',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('edt', {
  name: 'Educational Toys',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('odg', {
  name: 'Outdoor Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('pbg', {
  name: 'Puzzles & Brain Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('daf', {
  name: 'Dolls & Action Figures',
  parent: InterestGroups.ToysGamesAndSports
});

interestFilterValues.set('brdg', {
  name: 'Board Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('cg', {
  name: 'Card Games',
  parent: InterestGroups.ToysGamesAndSports
});
interestFilterValues.set('aot', {
  name: 'All Other Toys',
  parent: InterestGroups.ToysGamesAndSports
});
