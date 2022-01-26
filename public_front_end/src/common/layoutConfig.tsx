import { LayoutConfigType } from '../components/Layout/type';
import AppConfig from './appConfig';
import { FilterDBKeys } from './dbKeys';
import {
  ageGrpFilterValues,
  interestFilterValues,
  interestGroupMap,
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
      img: '/images/logo.png',
      alt: AppConfig.COMMON.appName
    },
    leftSideNav: [
      {
        type: 'expand',
        depth: 1,
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
        data: {
          title: 'Age Group',
          items: createOptions(ageGrpFilterValues, FilterDBKeys.ageGrp)
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
    main: {
      title: 'About',
      desc: {
        content:
          'IndeWebber is the perfect place to start your web journey.<br> Be it a simple static website or a dynamic website with custom functionalities, IndeWebber will make it happen for you and your business. '
      },
      socialIconLinks: []
    },
    links: [
      {
        text: 'Home',
        link: 'intro'
      },
      {
        text: 'Design',
        link: 'design'
      },
      {
        text: 'Why Choose Us',
        link: 'whychoose'
      },
      {
        text: 'Features',
        link: 'features'
      },
      {
        text: 'FAQ',
        link: 'faq'
      }
    ],
    contactInfo: {
      email: AppConfig.INFO.contact_email,
      phone: AppConfig.INFO.contact_number
    }
  }
};
