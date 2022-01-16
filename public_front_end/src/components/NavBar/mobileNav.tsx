import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { NavConfig } from './type';
import { Button, Icon, SectionTitle } from '..';
import AppConfig from '../../common/appConfig';
import { useRouter } from 'next/router';

type Props = {
  config: NavConfig;
  menuOpen: boolean;
  toggleMenuOpen: Function;
};

const MobileNav: FC<Props> = ({ config, menuOpen, toggleMenuOpen }) => {
  const router = useRouter();
  return (
    <Transition.Root show={menuOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 flex z-40 lg:hidden '
        onClose={() => toggleMenuOpen()}
      >
        <Transition.Child
          as={Fragment}
          enter='transition transition-opacity ease-in-out duration-300 transform'
          enterFrom='opacity-0 -translate-y-10'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-10'
        >
          <div className='relative w-full bg-skin-fill pb-12 flex flex-col overflow-y-auto text-2xl'>
            <div className='px-4 pt-5 pb-2 flex items-center justify-start '>
              <button
                type='button'
                className='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                onClick={() => toggleMenuOpen(false)}
              >
                <Icon iconName='Close' title='Close menu' />
              </button>
            </div>

            {/* Links */}

            <div className='flex flex-col items-center py-6 px-4 space-y-6'>
              <SectionTitle content={AppConfig.COMMON.appName} />
              {config.leftSideNav.map((btn, i) => (
                <div key={i} className='flow-root p-2'>
                  <Button
                    key={i}
                    onClick={() => {
                      router.push(`${btn.link}`);
                      toggleMenuOpen(false);
                    }}
                    text={btn.text}
                    icon={btn.icon}
                    showOnlyIcon={btn.showOnlyIcon}
                    wrapperClasses={`border-0 ${btn.wrapperClasses}`}
                    styleClasses={`text-skin-primary ${btn.styleClasses}`}
                    defautStyle='cust-btn-link'
                  />
                </div>
              ))}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileNav;
