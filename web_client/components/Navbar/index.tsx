import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon
} from '@heroicons/react/outline';
import { classNames } from '../../helpers/utils';
import MobileNav from './mobileNav';

const navigation = {
  categories: [
    {
      id: 'Events',
      name: 'Events',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.'
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
        }
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' }
          ]
        }
      ]
    },
    {
      id: 'About',
      name: 'About',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.'
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
        }
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' }
          ]
        }
      ]
    }
  ],
  pages: [
    { name: 'Gallery', href: '#' },
    { name: 'Publications', href: '#' }
  ]
};

const NavBar = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-skin-fill'>
      {/* Mobile menu */}
      <MobileNav open={open} setOpen={setOpen} navigation={navigation} />

      <header className='relative bg-skin-fill'>
        <nav
          aria-label='Top'
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        >
          <div className='border-b border-skin-primary'>
            <div className='h-16 flex items-center'>
              <button
                type='button'
                className='bg-skin-fill p-2 rounded-md text-skin-primary lg:hidden'
                onClick={() => setOpen(true)}
              >
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <a href='#'>
                  <span className='sr-only'>Workflow</span>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                    alt=''
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='h-full flex space-x-8'>
                  {navigation.categories.map(category => (
                    <Popover key={category.name} className='flex'>
                      {({ open }) => (
                        <>
                          <div className='relative flex'>
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-skin-accent text-skin-primary'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Popover.Panel className='absolute top-full inset-x-0 text-sm text-gray-500'>
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className='absolute inset-0 top-1/2 bg-skin-fill shadow'
                                aria-hidden='true'
                              />

                              <div className='relative bg-skin-fill'>
                                <div className='max-w-7xl mx-auto px-8'>
                                  <div className='grid grid-cols-2 gap-y-10 gap-x-8 py-16'>
                                    <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                                      {category.featured.map(item => (
                                        <div
                                          key={item.name}
                                          className='group relative text-base sm:text-sm'
                                        >
                                          <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75'>
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className='object-center object-cover'
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className='mt-6 block font-medium text-gray-900'
                                          >
                                            <span
                                              className='absolute z-10 inset-0'
                                              aria-hidden='true'
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden='true'
                                            className='mt-1'
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className='row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm'>
                                      {category.sections.map(section => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className='font-medium text-gray-900'
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role='list'
                                            aria-labelledby={`${section.name}-heading`}
                                            className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                          >
                                            {section.items.map(item => (
                                              <li
                                                key={item.name}
                                                className='flex'
                                              >
                                                <a
                                                  href={item.href}
                                                  className='hover:text-gray-800'
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map(page => (
                    <a
                      key={page.name}
                      href={page.href}
                      className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Sign in
                  </a>
                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Create account
                  </a>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <a
                    href='#'
                    className='p-2 text-skin-inverted hover:text-gray-500'
                  >
                    <span className='sr-only'>Search</span>
                    <SearchIcon className='w-6 h-6' aria-hidden='true' />
                  </a>
                </div>

                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <a href='#' className='group -m-2 p-2 flex items-center'>
                    <ShoppingBagIcon
                      className='flex-shrink-0 h-6 w-6 text-skin-inverted group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      0
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
