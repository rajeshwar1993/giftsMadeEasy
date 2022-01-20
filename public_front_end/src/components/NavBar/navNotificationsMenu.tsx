import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Button, SectionTitle } from '..';
import Notifications from '../../models/Notifications';

type Props = {
  open: boolean;
  notifications: Array<Notifications>;
  closeModal: () => void;
  markNotification: (op: 'read' | 'dismiss', notiId: string) => void;
};

const NavNotificationsMenu: FC<Props> = ({
  open,
  closeModal,
  markNotification,
  notifications
}) => {
  const router = useRouter();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-40 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='min-h-screen text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-skin-inverted bg-opacity-70' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span> */}

          <Transition.Child
            as={Fragment}
            enter='transition-all ease-in-out duration-300 transform'
            enterFrom='opacity-0 translate-x-64'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 translate-x-64'
          >
            <div className='fixed right-0 w-2/3 xl:max-w-lg h-full bg-skin-fill pb-12 '>
              <div className='flex flex-col'>
                <div className='px-4 pt-5 pb-2 flex items-center justify-between '>
                  <SectionTitle content='Notifications' />
                  <Button
                    icon={{ iconName: 'Close', size: '30' }}
                    onClick={closeModal}
                    defautStyle='cust-btn-link'
                    styleClasses='!border-b-0'
                  />
                </div>

                <div className=' flex flex-col  items-start py-2 xl:pl-4 pr-6 space-y-6'>
                  {notifications.map(n => (
                    <div className='flex flex-col items-start' key={n.uid}>
                      <Button
                        text={n.text}
                        link={n.redirectLink}
                        onClick={() => {
                          markNotification('read', '123');
                          closeModal();
                        }}
                        defautStyle='cust-btn-btn'
                        wrapperClasses='w-full'
                        styleClasses={`w-full !py-3 text-left !border-0 !justify-start ${
                          n.read ? '!font-normal' : '!font-semibold'
                        }`}
                      />

                      <Button
                        text='Remove'
                        onClick={() => markNotification('dismiss', n.uid)}
                        defautStyle='cust-btn-link'
                        styleClasses='text-xs ml-4'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NavNotificationsMenu;
