import { PageProps } from '../../../../core/pageFormats/types';
import {
  APP_TITLE,
  CONTACT_EMAIL
} from '../../../../core_custom_mixer/app_config';

const HomePageConfig: PageProps = {
  headerData: {
    title: APP_TITLE,
    metaDesc:
      'We help create beautiful static websites for our clients with excellent SEO and increase their online presence.'
  },
  sections: [
    {
      type: 'Paragraph',
      data: {
        id: 'intro',
        paraWrapperClasses: 'max-w-5xl mx-auto',
        banner: {
          image: {
            src: '/media/image_5.jpg',
            alt: 'Banner Image'
          }
        },
        sectionTitle: {
          content: 'Do you like this Website? I can help create this for you.'
        },
        paragraphs: [
          {
            content:
              'I am Rajeshwar Rudra and I create beautiful, informative and easy to use websites similar to this one, for my clients. Having a total experience of 7+ years in Web Design and Development and have worked with big firms throughout my career, I understand client needs and how to turn them into websites that not only look beautiful but also deliver the information effectively to the visitors.',
            styleClasses: 'text-center'
          },
          {
            content:
              'Feel free to browse through the entire website. If you like it, do let me know!',
            styleClasses: 'text-center'
          }
        ],
        button: {
          icon: {
            iconName: 'Email'
          },
          text: CONTACT_EMAIL,
          link: `mailto:${CONTACT_EMAIL}`,
          wrapperClasses:
            'w-fit mx-auto border-2 rounded-lg border-skin-inverted'
        }
      }
    },
    {
      type: 'ParagraphImageSplit',
      data: {
        id: 'design',
        sectionTitle: {
          content: 'Beautiful & Effective'
        },
        paragraph: {
          content:
            'The Design system offers an <i>Elegant</i> and yet <i>Effective</i> look and feel to the entire website. We ensure the layout is pleasing to the eyes, as well holds all the key components that deliver the business information to the visitors.'
        },
        image: {
          src: '/media/image_2.jpg',
          alt: 'Beautiful & Elegant'
        }
      }
    },
    {
      type: 'ColumnList',
      data: {
        id: 'whychoose',
        sectionTitle: {
          content: 'Why Choose Us?'
        },
        columns: [
          {
            colTitle: {
              content: 'Responsive Design'
            },
            body: {
              content:
                'This website looks amazing on all devices.<br/> Be it desktops, mobile or tablets, the Responsive Design System handles it all.<br/> Try opening this website on your phone!'
            }
          },
          {
            colTitle: {
              content: 'SEO First'
            },
            body: {
              content: `The primary objective of any website is to rank high on Search Engines. We ensure all the technical aspects like proper header and semantic HTML tags are appropriate for SEO.`
            }
          },
          {
            colTitle: {
              content: 'Latest Technology'
            },
            body: {
              content:
                '<i>NextJs</i>, a ReactJs production ready framework, is what we use to build all our websites. It’s a performance first tool that ensures we deliver fast and easy to maintain websites each time.'
            }
          }
        ]
      }
    },
    {
      type: 'Testimonial',
      data: {
        id: 'testimonial',
        text: {
          content:
            'We have such an elegant website now, and the entire process was so seamless.<br/> Well Done!'
        },
        image: {
          src: '/media/image_6.jpg',
          alt: 'Sample'
        },
        authorText: 'A Satisfied Customer'
      }
    },

    {
      type: 'TableSection',
      data: {
        id: 'features',
        sectionTitle: {
          content: 'Features Glance'
        },
        desc: {
          content: 'These are some of the key features we deliver. '
        },
        tableHeader: {
          tds: [
            {
              content: 'Feature'
            },
            {
              content: 'Impact'
            },
            {
              content: ''
            }
          ]
        },
        tableData: {
          rows: [
            {
              tds: [
                {
                  text: {
                    content: 'Responsive design that looks good on any device.'
                  }
                },
                {
                  text: {
                    content: 'User Experience'
                  }
                },
                {
                  icon: {
                    iconName: 'CheckCircle'
                  }
                }
              ]
            },

            {
              tds: [
                {
                  text: {
                    content: 'Easy Navigation and mobile friendly buttons.'
                  }
                },
                {
                  text: {
                    content: 'User Experience'
                  }
                },
                {
                  icon: {
                    iconName: 'CheckCircle'
                  }
                }
              ]
            },
            {
              tds: [
                {
                  text: {
                    content:
                      'SEO First approach for Best Outreach and Search rankings.'
                  }
                },
                {
                  text: {
                    content: 'Website Visibility'
                  }
                },
                {
                  icon: {
                    iconName: 'CheckCircle'
                  }
                }
              ]
            },
            {
              tds: [
                {
                  text: {
                    content:
                      'Auto generated sitemaps for Search engines indexing.'
                  }
                },
                {
                  text: {
                    content: 'Website Visibility'
                  }
                },
                {
                  icon: {
                    iconName: 'CheckCircle'
                  }
                }
              ]
            },
            {
              tds: [
                {
                  text: {
                    content:
                      'Built on ReactJs and NextJs. TailwindCSS for styling. Best tools in the industry.'
                  }
                },
                {
                  text: {
                    content: 'Easy Update and Maintenance.'
                  }
                },
                {
                  icon: {
                    iconName: 'CheckCircle'
                  }
                }
              ]
            },
            {
              tds: [
                {
                  text: {
                    content:
                      'All written in custom in-house and complete ownership of code.'
                  }
                },
                {
                  text: {
                    content: 'Easy Update and Maintenance.'
                  }
                },
                {
                  icon: {
                    iconName: 'CheckCircle'
                  }
                }
              ]
            }
          ]
        }
      }
    },

    {
      type: 'DisclosureList',
      data: {
        id: 'faq',
        sectionTitle: {
          content: 'Frequently Asked Questions'
        },
        list: [
          {
            title: {
              content: 'What are the type of websites we offer?'
            },
            body: {
              content:
                'We offer the following solutions - Static Websites, Websites with CMS Support and Dynamic Custom Websites.'
            }
          },
          {
            title: {
              content: 'What are our ususal timelines?'
            },
            body: {
              content:
                'The final timelines are dependent on the specific needs of the client. <br/>On average a static website with 5-6 pages has a timeline of 15-20 days.'
            }
          },
          {
            title: {
              content: 'What is the overall process?'
            },
            body: {
              content: `The initial and most crucial step is you droping us a mail on ${CONTACT_EMAIL}. <br/> After that we will schedule a call to understand your business needs and ideas for the website. We will also recommend based on our experience as to which type of website will suit your needs the best. <br/> Then we go on an iterative development process, where we will have bi-weekly calls to update the progress untill completion.`
            }
          },
          {
            title: {
              content: 'Do we help in the website go live?'
            },
            body: {
              content:
                'Yes, absolutely! If you wish, we will also deploy the website to a web-hosting you preffer. Domain purchasing and management services is also available.'
            }
          }
        ]
      }
    }
  ]
};

export default HomePageConfig;
