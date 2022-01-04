import React, { FC, Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import AllComponents from '../../../core_custom_mixer/components';

type Props = {
  open: boolean;
  closeModal: () => void;
};

const NavNotificationsMenu: FC<Props> = ({ open, closeModal }) => {
  const { SectionTitle, Button } = AllComponents;
  const router = useRouter();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-40' onClose={closeModal}>
        <div className='min-h-screen justify-end px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-skin-accent bg-opacity-70' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='transition-all ease-out duration-300 transform'
            enterFrom='w-0'
            enterTo='w-full'
            leave='transition-all ease-in-out duration-300 transform'
            leaveFrom='w-full'
            leaveTo='w-0'
          >
            <div className='fixed right-0 w-3/4 xl:w-2/5 min-h-screen bg-skin-fill pb-12 flex flex-col overflow-y-auto'>
              <div className='px-4 pt-5 pb-2 flex items-center justify-between '>
                <SectionTitle content='Notifications' />
                <Button
                  icon={{ iconName: 'Close', size: '30' }}
                  onClick={closeModal}
                  defautStyle='cust-btn-link'
                  styleClasses='!border-b-0'
                />
              </div>

              {/* Links */}

              <div className=' flex flex-col  items-start py-2 pl-4 pr-12 space-y-6'>
                <Button
                  text="Rajeshwar has added you in your circle. See Rajeshwar's profile and add them to your circle as well!"
                  defautStyle='cust-btn-btn'
                  wrapperClasses='w-full !mt-2'
                  styleClasses='w-full !py-3 text-left !border-0 !justify-start'
                />
                <Button
                  text='Rajeshwar has added you in your circle!'
                  defautStyle='cust-btn-btn'
                  wrapperClasses='w-full !mt-2'
                  styleClasses='w-full !py-3 text-left !border-0 !justify-start'
                />
                <Button
                  text='Rajeshwar has added you in your circle!'
                  defautStyle='cust-btn-btn'
                  wrapperClasses='w-full !mt-2'
                  styleClasses='w-full !py-3 text-left !border-0 !justify-start'
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NavNotificationsMenu;
