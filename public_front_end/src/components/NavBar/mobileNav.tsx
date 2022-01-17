import React, { FC, Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExpandMenuItem, NavConfig } from './type';
import { Button, Icon, SectionTitle, Text } from '..';
import AppConfig from '../../common/appConfig';
import { useRouter } from 'next/router';
import { ButtonType } from '../Reusable/Button/type';

type Props = {
  config: NavConfig;
  menuOpen: boolean;
  toggleMenuOpen: Function;
};

const MobileNav: FC<Props> = ({ config, menuOpen, toggleMenuOpen }) => {
  const router = useRouter();

  const [currentDepth, setCurrentDepth] = useState(0);
  const [step1Items, setStep1Items] = useState<Array<ExpandMenuItem>>([]);
  const [step2Items, setStep2Items] = useState<Array<ExpandMenuItem>>([]);

  useEffect(() => {
    if (menuOpen) {
      setCurrentDepth(0);
      setStep1Items([]);
      setStep2Items([]);
    }
  }, [menuOpen]);

  return (
    <div
      className={`absolute top-0 w-screen h-screen bg-skin-fill ${
        !menuOpen && 'hidden'
      }`}
    >
      <Transition.Root show={menuOpen && currentDepth === 0} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 lg:hidden '
          onClose={() => toggleMenuOpen()}
        >
          <Transition.Child
            as={Fragment}
            enter='transition transition-opacity ease-in-out duration-300 transform'
            enterFrom='opacity-0 translate-x-12'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 -translate-x-12'
          >
            <div className='relative w-full bg-skin-fill pb-12 flex flex-col overflow-y-auto text-2xl'>
              <div className='px-4 pt-5 pb-2 flex items-center justify-end'>
                <button
                  type='button'
                  className='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                  onClick={() => {
                    toggleMenuOpen(false);
                  }}
                >
                  <Icon iconName='Close' title='Close menu' />
                </button>
              </div>

              {/* Links */}

              <div className='flex flex-col items-center py-6 px-4 space-y-6'>
                <SectionTitle content={AppConfig.COMMON.appName} />
                {config.leftSideNav.map((item, i) => {
                  if (item.type === 'link') {
                    let data = item.data as ButtonType;
                    return (
                      <div key={i} className='flow-root p-2'>
                        <Button
                          onClick={() => {
                            router.push(`${data.link}`);
                            toggleMenuOpen(false);
                          }}
                          text={data.text}
                          icon={data.icon}
                          showOnlyIcon={data.showOnlyIcon}
                          wrapperClasses={`border-0 ${data.wrapperClasses}`}
                          styleClasses={`text-skin-primary ${data.styleClasses}`}
                          defautStyle='cust-btn-link'
                        />
                      </div>
                    );
                  } else {
                    let data = item.data as ExpandMenuItem;
                    return (
                      <Button
                        onClick={() => {
                          setCurrentDepth(state => state + 1);
                          setStep1Items(data.items || []);
                        }}
                        text={data.title}
                        wrapperClasses={`border-0`}
                        styleClasses={`text-skin-primary`}
                        defautStyle='cust-btn-link'
                      />
                    );
                  }
                })}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={menuOpen && currentDepth === 1} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 lg:hidden '
          onClose={() => {
            toggleMenuOpen();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='transition transition-opacity ease-in-out duration-300 transform'
            enterFrom='opacity-0 translate-x-12'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 -translate-x-12'
          >
            <div className='relative w-full bg-skin-fill pb-12 flex flex-col overflow-y-auto text-2xl'>
              <div className='px-4 pt-5 pb-2 flex items-center justify-between'>
                <button
                  type='button'
                  className='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                  onClick={() => setCurrentDepth(state => state - 1)}
                >
                  <Icon iconName='ArrowBack' title='back' />
                </button>
                <button
                  type='button'
                  className='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                  onClick={() => {
                    toggleMenuOpen(false);
                  }}
                >
                  <Icon iconName='Close' title='Close menu' />
                </button>
              </div>

              {/* Links */}

              <div className='flex flex-col items-center py-6 px-4 space-y-6'>
                <SectionTitle content={AppConfig.COMMON.appName} />
                {step1Items.map((item, i) => {
                  if (item.link) {
                    return (
                      <div key={i} className='flow-root p-2'>
                        <Button
                          onClick={() => {
                            router.push(`${item.link}`);
                            toggleMenuOpen(false);
                          }}
                          text={item.title}
                          wrapperClasses={`border-0`}
                          styleClasses={`text-skin-primary`}
                          defautStyle='cust-btn-link'
                        />
                      </div>
                    );
                  } else {
                    let data = item;
                    return (
                      <Button
                        onClick={() => {
                          setCurrentDepth(state => state + 1);
                          setStep2Items(data.items || []);
                        }}
                        text={data.title}
                        wrapperClasses={`border-0`}
                        styleClasses={`text-skin-primary`}
                        defautStyle='cust-btn-link'
                      />
                    );
                  }
                })}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={menuOpen && currentDepth === 2} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 lg:hidden '
          onClose={() => {
            toggleMenuOpen();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='transition transition-opacity ease-in-out duration-300 transform'
            enterFrom='opacity-0 translate-x-12'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 -translate-x-12'
          >
            <div className='relative w-full bg-skin-fill pb-12 flex flex-col overflow-y-auto text-2xl'>
              <div className='px-4 pt-5 pb-2 flex items-center justify-between'>
                <button
                  type='button'
                  className='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                  onClick={() => setCurrentDepth(state => state - 1)}
                >
                  <Icon iconName='ArrowBack' title='back' />
                </button>
                <button
                  type='button'
                  className='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                  onClick={() => {
                    toggleMenuOpen(false);
                  }}
                >
                  <Icon iconName='Close' title='Close menu' />
                </button>
              </div>

              {/* Links */}
              <div className='flex flex-col items-center py-6 px-4 space-y-6'>
                <SectionTitle content={AppConfig.COMMON.appName} />
                {step2Items.map((item, i) => {
                  return (
                    <div key={i} className='flow-root p-2'>
                      <Button
                        onClick={() => {
                          router.push(`${item.link}`);
                          toggleMenuOpen(false);
                        }}
                        text={item.title}
                        wrapperClasses={`border-0`}
                        styleClasses={`text-skin-primary`}
                        defautStyle='cust-btn-link'
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileNav;
