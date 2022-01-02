import { AgeGroup, Occasion, Relationship } from '../../models/enums';

interface DataConfigType {
  relationship: {
    [key: string]: string;
  };
  ageGrp: {
    [key: string]: string;
  };
  occasion: {
    [key: string]: string;
  };
}

const DataConfig: DataConfigType = {
  relationship: {
    [Relationship.Girlfriend.toString()]: 'gf',
    [Relationship.Boyfriend.toString()]: 'bf',
    [Relationship.Friend.toString()]: 'f',
    [Relationship.Husband.toString()]: 'h',
    [Relationship.Wife.toString()]: 'w',
    [Relationship.Son.toString()]: 'son',
    [Relationship.Daughter.toString()]: 'da',
    [Relationship.Brother.toString()]: 'br',
    [Relationship.Sister.toString()]: 'si',
    [Relationship.Father.toString()]: 'fa',
    [Relationship.Mother.toString()]: 'mo',
    [Relationship.Grandfather.toString()]: 'gr',
    [Relationship.Grandmother.toString()]: 'gm',
    [Relationship.Colleague.toString()]: 'col',
    [Relationship.Other.toString()]: 'o'
  },
  ageGrp: {
    [AgeGroup.Infant.toString()]: 'Inf',
    [AgeGroup.Toddler.toString()]: 'Tod',
    [AgeGroup.Kid.toString()]: 'Kid',
    [AgeGroup.Teenager.toString()]: 'Teen',
    [AgeGroup.YoungAdult.toString()]: 'YA',
    [AgeGroup.Adult.toString()]: 'A',
    [AgeGroup.ResponsibleAdult.toString()]: 'RA',
    [AgeGroup.Settled.toString()]: 'S',
    [AgeGroup.FinanciallySettled.toString()]: 'FS',
    [AgeGroup.ApproachingRetirement.toString()]: 'AR',
    [AgeGroup.Retired.toString()]: 'R',
    [AgeGroup.Wisdom.toString()]: 'Wis'
  },
  occasion: {
    [Occasion.Birthday.toString()]: 'Birthday',
    [Occasion.Anniversary.toString()]: 'Anniversary',
    [Occasion.Wedding.toString()]: 'Wedding',
    [Occasion.HouseWarming.toString()]: 'House Warming'
  }
};

export default DataConfig;
