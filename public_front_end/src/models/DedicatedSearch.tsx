import { DedicatedSearchDBKeys } from '../common/dbKeys';
import { Gender } from './enums';

interface DedicatedSearch {
  uid: string;
  searchCriteria: string;
  relationship: string;
  occasion: string;
  ageGrp: Array<string>;
  gender?: Array<Gender>;
  festivals: Array<string>;
  interests: Array<string>;
  isActive: boolean;
}

export const convertDedicatedSearchToJson = (ds: DedicatedSearch) => ({
  [DedicatedSearchDBKeys.searchCriteria]: ds.searchCriteria,
  [DedicatedSearchDBKeys.relationship]: ds.relationship,
  [DedicatedSearchDBKeys.occasion]: ds.occasion,
  [DedicatedSearchDBKeys.ageGrp]: ds.ageGrp,
  [DedicatedSearchDBKeys.gender]: ds.gender,
  [DedicatedSearchDBKeys.interests]: ds.interests,
  [DedicatedSearchDBKeys.festivals]: ds.festivals
});

export const convertDedicatedSearchToJsonForSearch = (ds: DedicatedSearch) => ({
  [DedicatedSearchDBKeys.relationship]: ds.relationship,
  [DedicatedSearchDBKeys.occasion]: ds.occasion,
  [DedicatedSearchDBKeys.ageGrp]: ds.ageGrp,
  [DedicatedSearchDBKeys.interests]: ds.interests
});

export const convertJsonToDedicatedSearchObj = (inp: any, id: string) => {
  const ds: DedicatedSearch = {
    uid: id,
    searchCriteria: inp[DedicatedSearchDBKeys.searchCriteria] || '',
    relationship: inp[DedicatedSearchDBKeys.relationship] || '',
    occasion: inp[DedicatedSearchDBKeys.occasion] || '',
    ageGrp: inp[DedicatedSearchDBKeys.ageGrp] || [],
    gender: inp[DedicatedSearchDBKeys.gender] || [],
    interests: inp[DedicatedSearchDBKeys.interests] || [],
    festivals: inp[DedicatedSearchDBKeys.festivals] || [],
    isActive: inp[DedicatedSearchDBKeys.isActive] || false
  };
  return ds;
};

export default DedicatedSearch;
