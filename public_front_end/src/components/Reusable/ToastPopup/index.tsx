import { Transition } from '@headlessui/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { app_sendToast } from '../../../redux/appCommon';
import { RootState, useAppDispatch } from '../../../redux/store';
import Icon from '../Icon';
import Text from '../Text';

type Props = {};

let timeOut: any = null;

const ToastPopover: FC<Props> = ({}) => {
  const toastData = useSelector((state: RootState) => state.app.toast);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!toastData) {
      if (timeOut) clearTimeout(timeOut);
      setOpen(true);
      timeOut = setTimeout(() => {
        setOpen(false);
      }, toastData.duration || 3000);
    }
  }, [toastData]);

  return (
    <Transition appear show={open} as={Fragment}>
      <div>
        <Transition.Child
          as={Fragment}
          enter='transition-all ease-in-out duration-300 transform'
          enterFrom='opacity-0 translate-y-10 md:translate-y-0 md:translate-x-16'
          enterTo='opacity-100 translate-y-0 md:translate-y-0 md:translate-x-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='opacity-100 translate-y-0 md:translate-y-0 md:translate-x-0'
          leaveTo='opacity-0 translate-y-10 md:translate-y-0 md:translate-x-16'
          afterLeave={() => {
            dispatch(app_sendToast(null));
          }}
        >
          <div
            className={`${
              toastData?.type === 'error' ? 'bg-red-600' : 'bg-skin-inverted'
            }  z-10 fixed shadow-xl text-center text-skin-inverted rounded-lg px-8 py-6 bottom-10 left-[calc(50%-120px)] w-60 md:w-96 md:left-auto md:bottom-auto md:top-24 md:right-10`}
          >
            <Text content={toastData?.message || ''} />
            <button
              onClick={() => {
                setOpen(false);
                clearTimeout(timeOut);
              }}
              className='absolute top-2 right-2 ml-2 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 '
            >
              <Icon iconName='Close' size='20' />
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default ToastPopover;
