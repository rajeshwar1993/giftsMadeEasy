import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { FC, Fragment } from 'react';
import { Button, Icon, ImageComponent } from '..';

import { auth } from '../../firebase';

type Props = {
  imgSrc: string;
  name: string;
};

const NavProfileMenu: FC<Props> = ({ imgSrc, name }) => {
  const router = useRouter();
  return (
    <div className='text-right'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='px-4 py-2 '>
            <div className='rounded-full overflow-hidden border-2 border-skin-inverted'>
              <ImageComponent
                src={imgSrc}
                alt={name}
                height={30}
                width={30}
                layout='fixed'
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='z-20 absolute right-0 w-56 mt-2 origin-top-right bg-skin-fill-card divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1'>
              <Menu.Item onClick={() => router.push('/profile')}>
                <Button
                  icon={{ iconName: 'Person' }}
                  text='Profile'
                  defautStyle='cust-btn-btn'
                  styleClasses='w-full !border-0 !py-2 text-base !justify-start'
                  wrapperClasses='w-full my-2'
                />
              </Menu.Item>
            </div>
            <div className='px-1'>
              <Menu.Item onClick={() => router.push('/profile')}>
                <Button
                  icon={{ iconName: 'OutlineFavorite' }}
                  text='Wishlist'
                  defautStyle='cust-btn-btn'
                  styleClasses='w-full !border-0 !py-2 text-base !justify-start'
                  wrapperClasses='w-full my-2'
                />
              </Menu.Item>
            </div>
            <div className='px-1'>
              <Menu.Item>
                <Button
                  icon={{ iconName: 'BookmarkBorder' }}
                  text='Bookmarks'
                  defautStyle='cust-btn-btn'
                  styleClasses='w-full !border-0 !py-2 text-base !justify-start'
                  wrapperClasses='w-full my-2'
                />
              </Menu.Item>
            </div>
            <div className='px-1'>
              <Menu.Item
                onClick={() => {
                  signOut(auth);
                }}
              >
                <Button
                  icon={{ iconName: 'Exit' }}
                  text='Signout'
                  defautStyle='cust-btn-btn'
                  styleClasses='w-full !border-0 !py-2 text-base !justify-start'
                  wrapperClasses='w-full my-2'
                />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavProfileMenu;
