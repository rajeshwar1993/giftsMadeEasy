import { LayoutConfigType } from '../components/Layout/type';
import AppConfig from './appConfig';

export const layoutConfig: LayoutConfigType = {
  navbar: {
    title: AppConfig.COMMON.appName,
    logo: {
      img: '/images/logo.png',
      alt: AppConfig.COMMON.appName
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
      email: AppConfig.INFO.contact_email,
      phone: AppConfig.INFO.contact_number
    }
  }
};
