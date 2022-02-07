import React, { FC, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '../../common/utils';
import { Text } from '../../components';
import ProductListSection from './productListSection';
import MyCircle from './myCircle';
import UserType from '../../models/User';

type Props = {
  isMe: boolean;
  user: UserType;
};

const CircleWishBookTabs: FC<Props> = ({ isMe, user }) => {
  const [defautIndex, setDefaultIndex] = useState(0);

  useEffect(() => {
    setDefaultIndex(0);
  }, [isMe]);

  // TODO set default tab if navigating from menu to specific tab
  return (
    <Tab.Group defaultIndex={defautIndex}>
      <Tab.List className='flex p-1 space-x-10 '>
        <Tab
          className={({ selected }) =>
            classNames(
              'p-2.5 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
              selected ? 'border-opacity-100' : ''
            )
          }
        >
          <Text
            styleClasses='text-base xl:text-4xl font-light'
            content='Wishlist'
          />
        </Tab>
        {isMe && (
          <Tab
            className={({ selected }) =>
              classNames(
                'p-2.5 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                selected ? 'border-opacity-100' : ''
              )
            }
          >
            <Text
              styleClasses='text-base xl:text-4xl font-light'
              content='MyCircle'
            />
          </Tab>
        )}

        {isMe && (
          <Tab
            className={({ selected }) =>
              classNames(
                'p-2.5 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                selected ? 'border-opacity-100' : ''
              )
            }
          >
            <Text
              styleClasses='text-base xl:text-4xl font-light'
              content='Bookmarks'
            />
          </Tab>
        )}
      </Tab.List>
      <Tab.Panels className='mt-2'>
        <Tab.Panel
          className={classNames(
            'rounded-xl p-3',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          <ProductListSection
            tagLine='This is a public wishlist. Your connections can choose to gift you one of these items.'
            inputList={user.wishlist}
          />
        </Tab.Panel>
        {isMe && (
          <Tab.Panel
            className={classNames(
              'rounded-xl p-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <MyCircle isMe={isMe} />
          </Tab.Panel>
        )}

        {isMe && (
          <Tab.Panel
            className={classNames(
              'rounded-xl p-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <ProductListSection
              tagLine='This is a private list, helpful for keeping items you want to give as gifts.'
              inputList={user.bookmarks}
            />
          </Tab.Panel>
        )}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CircleWishBookTabs;
