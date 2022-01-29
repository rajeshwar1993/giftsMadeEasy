import { APP_NAME, CONTACT_EMAIL, CONTACT_NUMBER } from './constants';
import { FilterDBKeys } from './dbKeys';

const AppConfig = {
  COMMON: {
    appName: APP_NAME,
    relationshipLabel: 'Relationship',
    ageGroupLabel: 'Age Group',
    occasionLabel: 'Occasion',
    genderLabel: 'Gender',
    buyNowLabel: 'Buy Now on Aamzon',
    contact_email: CONTACT_EMAIL,
    contact_number: CONTACT_NUMBER
  },
  HOME: {
    hL1: 'give gifts that matter',
    hL2: `and we'll help you find them`,
    aboutLine: `We <em>Curate</em> and <em>Categorize</em> the top rated gifting products from trusted websites like <strong>Amazon</strong>, making this the one-stop destination for all your gifting needs!`,
    showcase: [
      {
        title: 'Popular Gifts for Brothers',
        seeAllLink: `/search?${FilterDBKeys.relationship}=br`,
        seeAllTitle: 'Find all gifts for Brothers',
        queryParams: {
          [FilterDBKeys.relationship]: 'br'
        }
      },
      {
        title: 'Popular Anniversary Gifts',
        seeAllLink: `/search?${FilterDBKeys.occasion}=a`,
        seeAllTitle: 'Find All Anniversary Gifts',
        queryParams: {
          [FilterDBKeys.occasion]: 'a'
        }
      },
      {
        title: 'Top Selling gifts',
        seeAllLink: `/search`,
        seeAllTitle: 'Find all top selling gifts',
        queryParams: {}
      }
    ]
  },
  SEARCH: {},
  PRODUCT: {}
};

export default AppConfig;
