import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import { Button, Text } from '..';
import { ExpandMenuItem } from './type';

type Props = {
  buttonText: string;
  depth: 0 | 1 | 2;
  headline?: string;
  items?: Array<ExpandMenuItem>;
};

const MenuPopover: FC<Props> = ({
  buttonText,
  items = [],
  depth = 1,
  headline
}) => {
  return (
    <Popover>
      {({ open }) => (
        <div className='relative'>
          <Popover.Button
            className={`
                ${open ? 'border-opacity-90' : ''}
                mx-2 py-0.5 px-2 font-semibold underline underline-offset-[6px] decoration-accent-soft decoration-[2px] hover:decoration-accent cursor-pointer`}
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
            <Popover.Panel
              className={`absolute ${
                buttonText === 'Interests' && '-left-32'
              } w-max z-10 py-2 sm:px-0`}
            >
              {({ close }) => (
                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                  <div
                    className={`bg-skin-fill-card text-skin-primary grid gap-x-12 gap-y-4 py-7 px-12 ${
                      depth === 1 ? 'grid-cols-2' : 'grid-cols-4'
                    }`}
                  >
                    {headline && (
                      <Text
                        content={headline}
                        styleClasses={depth === 1 ? 'col-span-2' : 'col-span-4'}
                      />
                    )}
                    {items.map((item, i) => (
                      <div className='' key={i}>
                        <div className='mb-1'>
                          <Button
                            link={item.link}
                            text={
                              depth === 1 ? item.title : 'All ' + item.title
                            }
                            defautStyle='cust-btn-link'
                            styleClasses='text-sm'
                            wrapperClasses=' w-fit'
                            onClick={() => close()}
                          />
                        </div>

                        {item.items?.map((it, i) => (
                          <div className='my-0.5' key={i}>
                            <Button
                              link={it.link}
                              text={it.title}
                              defautStyle='cust-btn-link'
                              styleClasses='text-sm !font-normal'
                              wrapperClasses=' w-fit'
                              onClick={() => close()}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};

export default MenuPopover;
