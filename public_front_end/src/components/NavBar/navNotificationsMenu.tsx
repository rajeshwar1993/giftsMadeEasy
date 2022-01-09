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
            <div className=' fixed right-0 w-3/4 xl:w-2/5 min-h-screen bg-skin-fill pb-12 flex flex-col'>
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

              <div className=' flex flex-col  items-start py-2 xl:pl-4 pr-6 space-y-6'>
                {notifications.map(n => (
                  <div className='flex items-center' key={n.uid}>
                    <Button
                      text={n.text}
                      link={n.redirectLink}
                      onClick={() => {
                        markNotification('read', n.uid);
                        closeModal();
                      }}
                      defautStyle='cust-btn-btn'
                      wrapperClasses='w-full !mt-2'
                      styleClasses={`w-full !py-3 text-left !border-0 !justify-start ${
                        n.read ? '!font-light' : '!font-semibold'
                      }`}
                    />
                    <Button
                      icon={{ iconName: 'Check', size: '20' }}
                      onClick={() => markNotification('dismiss', n.uid)}
                      defautStyle='cust-btn-link'
                      styleClasses='!border-b-0'
                    />
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NavNotificationsMenu;
