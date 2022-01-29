import { APP_NAME, CONTACT_EMAIL, CONTACT_NUMBER } from './constants';

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
    aboutLine: `We <em>Curate</em> and <em>Categorize</em> the top rated gifting products from trusted websites like <strong>Amazon</strong>, making this the one-stop destination for all your gifting needs!`
  },
  SEARCH: {},
  PRODUCT: {}
};

export default AppConfig;
