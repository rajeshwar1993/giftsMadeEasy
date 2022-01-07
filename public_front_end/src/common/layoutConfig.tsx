import { LayoutConfigType } from '../components/Layout/type';
import { scrollToId, toggleTheme } from './utils';
import { APP_NAME, CONTACT_EMAIL, CONTACT_NUMBER } from './appConfig';

export const layoutConfig: LayoutConfigType = {
  navbar: {
    title: APP_NAME,
    logo: {
      img: '/images/logo.png',
      alt: APP_NAME
    },
    leftSideNav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Search',
        link: '/search'
      },
      {
        text: 'Signin',
        link: '/auth/signup'
      },
      {
        text: 'Profile',
        link: '/profile'
      },
      {
        text: 'Product',
        link: '/product'
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
      email: CONTACT_EMAIL,
      phone: CONTACT_NUMBER
    }
  }
};
