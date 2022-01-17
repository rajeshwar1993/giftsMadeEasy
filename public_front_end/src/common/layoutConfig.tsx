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
        type: 'expand',
        depth: 1,
        data: {
          title: 'Relation',
          items: [
            {
              title: 'Boyfriend',
              link: '#'
            },
            {
              title: 'Girlfriend',
              link: '#'
            },
            {
              title: 'Mother',
              link: '#'
            },
            {
              title: 'Father',
              link: '#'
            }
          ]
        }
      },
      {
        type: 'expand',
        depth: 2,
        data: {
          title: 'Interests',
          items: [
            {
              title: 'Electronics',

              items: [
                {
                  title: 'Laptops'
                },
                {
                  title: 'Watches'
                },
                {
                  title: 'Tablets'
                },
                {
                  title: 'Phones'
                }
              ]
            },
            {
              title: 'Toys & Games',

              items: [
                {
                  title: 'Outdoor sports'
                },
                {
                  title: 'Card Games'
                },
                {
                  title: 'Educational Toys'
                },
                {
                  title: 'RC Toys'
                }
              ]
            },
            {
              title: 'Toys & Games',

              items: [
                {
                  title: 'Outdoor sports'
                },
                {
                  title: 'Card Games'
                },
                {
                  title: 'Educational Toys'
                },
                {
                  title: 'RC Toys'
                }
              ]
            },
            {
              title: 'Toys & Games',

              items: [
                {
                  title: 'Outdoor sports'
                },
                {
                  title: 'Card Games'
                },
                {
                  title: 'Educational Toys'
                },
                {
                  title: 'RC Toys'
                }
              ]
            },
            {
              title: 'Toys & Games',

              items: [
                {
                  title: 'Outdoor sports'
                },
                {
                  title: 'Card Games'
                },
                {
                  title: 'Educational Toys'
                },
                {
                  title: 'RC Toys'
                }
              ]
            }
          ]
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
