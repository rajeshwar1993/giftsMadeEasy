import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import { Text } from '..';
import { ExpandMenuItem } from './type';

type Props = {
  buttonText: string;
  depth: 0 | 1 | 2;
  items?: Array<ExpandMenuItem>;
};

const MenuPopover: FC<Props> = ({ buttonText, items = [], depth = 1 }) => {
  return (
    <div className=''>
      <Popover className=''>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'border-opacity-90' : ''}
                mx-2 py-0.5 px-2 font-semibold border-b-2 border-skin-accent border-opacity-10 hover:border-opacity-90 cursor-pointer`}
            >
              <span>{buttonText}</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 -translate-y-4'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-4'
            >
              <Popover.Panel className='absolute -left-36 z-10 w-max max-w-sm px-4 py-2 sm:px-0 lg:max-w-3xl'>
                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                  <div
                    className={`relative bg-skin-fill grid gap-x-12 gap-y-4 py-7 px-12 ${
                      depth === 1 ? 'grid-cols-2' : 'grid-cols-4'
                    }`}
                  >
                    {items.map((item, i) => (
                      <div className='w-40' key={i}>
                        <div className='mb-1'>
                          <Link href={item.link || '#'}>
                            <Text
                              content={
                                depth === 1 ? item.title : 'All ' + item.title
                              }
                              styleClasses='font-semibold cursor-pointer hover:underline px-4 py-2'
                            />
                          </Link>
                        </div>

                        {item.items?.map((it, i) => (
                          <div className='my-0.5' key={i}>
                            <Link href={it.link || '#'}>
                              <Text
                                content={it.title}
                                styleClasses='font-normal cursor-pointer hover:underline px-4 py-2'
                              />
                            </Link>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MenuPopover;
