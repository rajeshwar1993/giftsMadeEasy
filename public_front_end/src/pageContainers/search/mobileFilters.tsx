import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Button } from '../../components';

const MobileFilters = () => {
  return (
    <Transition.Root show={false} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 flex z-40 lg:hidden '
        onClose={() => {}}
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
          <div className='p-4 w-full bg-skin-fill flex flex-col overflow-y-auto text-2xl'>
            {/* Top buttons */}
            <div className='flex justify-between items-center'>
              <Button
                wrapperClasses='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                styleClasses='!border-0 !px-2'
                onClick={() => {}}
                icon={{
                  size: '26',
                  iconName: 'Close'
                }}
              />

              <Button
                wrapperClasses='-m-2 p-2 rounded-md inline-flex text-skin-primary'
                styleClasses='!border-0 !px-2 text-base'
                onClick={() => {}}
                text='Clear All'
              />
            </div>

            {/* Links */}
            <div className='overlow-y-auto h-full flex justify-center items-center'>
              Filters
            </div>
            {/* Bottom buttons */}
            <div className='flex justify-between items-center'>
              <Button
                wrapperClasses='p-2 rounded-md inline-flex text-skin-primary w-full'
                styleClasses=' !px-2 text-lg w-full'
                onClick={() => {}}
                text='Cancel'
              />
              <Button
                wrapperClasses='p-2 rounded-md inline-flex text-skin-primary w-full'
                styleClasses=' !px-2 text-lg w-full'
                onClick={() => {}}
                text='Apply'
              />
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileFilters;
