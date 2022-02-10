import { LayoutConfigType } from '../components/Layout/type';
import AppConfig from './appConfig';
import { FilterDBKeys } from './dbKeys';
import {
  ageGrpFilterValues,
  interestFilterValues,
  interestGroupMap,
  occasionFilterValues,
  relationshipFilterValues
} from './staticFilterValues';

const createOptions = (
  valuesMap: Map<string, string | { name: string; parent: number }>,
  filterKey: string,
  grouping: boolean = false,
  groupValues?: Map<number, string>
) => {
  let values: any;
  if (!grouping) {
    values = [];
    valuesMap.forEach((val, key) => {
      values.push({ title: val, link: `/search?${filterKey}=${key}` });
    });
  } else if (groupValues) {
    values = [];
    groupValues.forEach((gval, gkey) => {
      let v: {
        title: string;
        link?: string;
        items: Array<{ title: string; link?: string }>;
      } = { title: gval, items: [] };
      let allLink: Array<string> = [];
      valuesMap.forEach((val: any, key) => {
        const { name, parent } = val;
        if (parent === gkey) {
          v.items.push({ title: name, link: `/search?${filterKey}=${key}` });
          allLink.push(`${filterKey}=${key}`);
        }
      });
      v.link = `/search?${allLink.join('&')}`;
      allLink = [];
      values.push(v);
    });
  }

  return values;
};

export const layoutConfig: LayoutConfigType = {
  navbar: {
    title: AppConfig.COMMON.appName,
    logo: {
      img: '/images/app_logo.png',
      alt: AppConfig.COMMON.appName
    },
    leftSideNav: [
      {
        type: 'expand',
        depth: 1,
        headline: 'I am looking for a gift for my',
        data: {
          title: 'Relation',
          items: createOptions(
            relationshipFilterValues,
            FilterDBKeys.relationship
          )
        }
      },
      {
        type: 'expand',
        depth: 2,
        headline: 'The person must be interested in some of these?',
        data: {
          title: 'Interests',
          items: createOptions(
            interestFilterValues,
            FilterDBKeys.interests,
            true,
            interestGroupMap
          )
        }
      },
      {
        type: 'expand',
        depth: 1,
        headline: 'How old is this person?',
        data: {
          title: 'Age',
          items: createOptions(ageGrpFilterValues, FilterDBKeys.ageGrp)
        }
      },
      {
        type: 'expand',
        depth: 1,
        headline: 'Whats the occassion?',
        data: {
          title: 'Occasions',
          items: createOptions(occasionFilterValues, FilterDBKeys.occasion)
        }
      },
      {
        type: 'link',
        depth: 0,
        data: {
          text: 'Search All Categories',
          link: '/search'
        }
      }
    ]
  },
  footer: {
    logo: {
      img: '/images/app_logo.png',
      alt: AppConfig.COMMON.appName
    },
    main: {
      title: AppConfig.COMMON.appName,
      desc: {
        content: `We at Tofa Circle eliminate the stress of chosing a gift.`
      },
      socialIconLinks: []
    },
    links: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Search All',
        link: '/search'
      },
      {
        text: 'About',
        link: '/about'
      },

      {
        text: 'Contact Us',
        link: '/contactus'
      },
      {
        text: 'How it works?',
        link: '/how'
      },
      {
        text: 'FAQ',
        link: '/faq'
      }
    ],
    contactInfo: {
      email: AppConfig.COMMON.contact_email,
      phone: undefined
    }
  }
};
