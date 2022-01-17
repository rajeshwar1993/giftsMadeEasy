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
              link: '#',
              items: [
                {
                  title: 'Laptops',
                  link: '#'
                },
                {
                  title: 'Watches',
                  link: '#'
                },
                {
                  title: 'Tablets',
                  link: '#'
                },
                {
                  title: 'Phones',
                  link: '#'
                }
              ]
            },
            {
              title: 'Toys & Games',
              link: '#',
              items: [
                {
                  title: 'Outdoor sports',
                  link: '#'
                },
                {
                  title: 'Card Games',
                  link: '#'
                },
                {
                  title: 'Educational Toys',
                  link: '#'
                },
                {
                  title: 'RC Toys',
                  link: '#'
                }
              ]
            },
            {
              title: 'Toys & Games',
              link: '#',
              items: [
                {
                  title: 'Outdoor sports',
                  link: '#'
                },
                {
                  title: 'Card Games',
                  link: '#'
                },
                {
                  title: 'Educational Toys',
                  link: '#'
                },
                {
                  title: 'RC Toys',
                  link: '#'
                }
              ]
            },
            {
              title: 'Toys & Games',
              link: '#',
              items: [
                {
                  title: 'Outdoor sports',
                  link: '#'
                },
                {
                  title: 'Card Games',
                  link: '#'
                },
                {
                  title: 'Educational Toys',
                  link: '#'
                },
                {
                  title: 'RC Toys',
                  link: '#'
                }
              ]
            },
            {
              title: 'Toys & Games',
              link: '#',
              items: [
                {
                  title: 'Outdoor sports',
                  link: '#'
                },
                {
                  title: 'Card Games',
                  link: '#'
                },
                {
                  title: 'Educational Toys',
                  link: '#'
                },
                {
                  title: 'RC Toys',
                  link: '#'
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
