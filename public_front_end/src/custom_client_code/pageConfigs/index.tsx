import { LayoutConfigType } from '../../core/components/Layout/type';
import { scrollToId, toggleTheme } from '../../core/utils';
import {
  APP_NAME,
  CONTACT_EMAIL,
  CONTACT_NUMBER
} from '../../core_custom_mixer/app_config';

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
    rightSideNav: [
      {
        text: 'Contact Us',
        link: `mailto:${CONTACT_EMAIL}`,
        icon: {
          iconName: 'Email'
        },
        showOnlyIcon: true
      },
      {
        icon: {
          iconName: 'Lightbulb'
        },
        onClick: toggleTheme,
        showOnlyIcon: true,
        styleClasses: '!border-0'
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
