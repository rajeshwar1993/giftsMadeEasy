import { APP_NAME, CONTACT_EMAIL, CONTACT_NUMBER } from './constants';
import { FilterDBKeys } from './dbKeys';

const AppConfig = {
  COMMON: {
    appName: APP_NAME,
    relationshipLabel: 'Relationship',
    ageGroupLabel: 'Age Group',
    occasionLabel: 'Occasion',
    genderLabel: 'Gender',
    buyNowLabel: 'Buy Now on Amazon',
    contact_email: CONTACT_EMAIL,
    contact_number: CONTACT_NUMBER,
    priceDisclaimer:
      '* This is an indicative price. Actual prices will be seen after adding to the actual cart.'
  },
  COMPONENTS: {
    giftSearchMini: {
      title: 'Quick Search',
      subtitle: `Two simple choices. It's that easy.`,
      searchLabel: 'Search'
    }
  },
  HOME: {
    headerData: {
      title: `${APP_NAME} | Give Gifts That Matter`
    },
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
  SEARCH: {
    headLine: 'Find the perfect gift',
    itemsFoundLabel: 'items found',
    clearAllLabel: 'clear all',
    filtersLabel: 'Filters',
    interestsLabel: 'Interests',
    filterByLabel: 'Filter By',
    upcommingFestivalsLabel: 'Upcoming Festivals',

    noResultsMessage:
      'Oops, we found no products matching your search. Please clear the filters and try again :)',
    btnApplyLabel: 'Apply',
    btnCancelLabel: 'Cancel'
  },

  PRODUCT: {
    mrpLabel: 'MRP',
    relTagTitle: 'Ideal for gifing your',
    ageGrpTagTitle: 'Perfect for Age-groups',
    occasiontagTitle: 'Best suited for occasions like',
    interestedTagTitle: 'Loved by people interested in',
    overviewLabel: 'Overview',
    featuresLabel: 'Features'
  }
};

export default AppConfig;
