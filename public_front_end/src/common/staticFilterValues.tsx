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
ageGrpFilterValues.set('W', 'Wisdom (71 and above)');

// Occasion
export const occasionFilterValues = new Map<string, string>();

occasionFilterValues.set('b', 'Birthday');
occasionFilterValues.set('a', 'Anniversary');
occasionFilterValues.set('w', 'Wedding');
occasionFilterValues.set('hw', 'House Warming');

// Festival
export const festivalilterValues = new Map<string, string>();

festivalilterValues.set('ny', 'New Years');
festivalilterValues.set('loh', 'Lohri');
festivalilterValues.set('rpd', 'Republic Day');
festivalilterValues.set('vd', `Valentine's Day`);
festivalilterValues.set('holi', `Holi`);

// Interest Groups
export const interestGroupMap = new Map<number, string>();

interestGroupMap.set(InterestGroups.Electronics, 'Electronics');
interestGroupMap.set(InterestGroups.ToysAndGames, 'Toys and Games');

// Interests
export const interestFilterValues = new Map<
  string,
  { name: string; parent: number }
>();

// Electronics
interestFilterValues.set('smph', {
  name: 'Smartphones',
  parent: InterestGroups.Electronics
});
interestFilterValues.set('lpt', {
  name: 'Laptops',
  parent: InterestGroups.Electronics
});
interestFilterValues.set('tab', {
  name: 'Tablets',
  parent: InterestGroups.Electronics
});
interestFilterValues.set('tv', {
  name: 'Television',
  parent: InterestGroups.Electronics
});

// Toys and Games
interestFilterValues.set('rct', {
  name: 'Radio Controlled Toys',
  parent: InterestGroups.ToysAndGames
});
interestFilterValues.set('edt', {
  name: 'Educational Toys',
  parent: InterestGroups.ToysAndGames
});
interestFilterValues.set('odg', {
  name: 'Outdoor Games',
  parent: InterestGroups.ToysAndGames
});
interestFilterValues.set('pbg', {
  name: 'Puzzles And Brain Games',
  parent: InterestGroups.ToysAndGames
});
interestFilterValues.set('daf', {
  name: 'Dolls and Action Figures',
  parent: InterestGroups.ToysAndGames
});

interestFilterValues.set('brdg', {
  name: 'Board Games',
  parent: InterestGroups.ToysAndGames
});
interestFilterValues.set('cg', {
  name: 'Card Games',
  parent: InterestGroups.ToysAndGames
});
interestFilterValues.set('aot', {
  name: 'All Other Toys',
  parent: InterestGroups.ToysAndGames
});
