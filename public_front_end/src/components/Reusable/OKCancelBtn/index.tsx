import React, { FC } from 'react';
import Button from '../Button';

type Props = {
  onClose: () => void;
  onSave: () => void;
};

const OKCancelBtn: FC<Props> = ({ onClose, onSave }) => {
  return (
    <div className='flex flex-row justify-between items-center'>
      <Button
        icon={{
          iconName: 'Close'
        }}
        defautStyle='cust-btn-btn'
        onClick={onClose}
        styleClasses='text-lg !rounded-full !py-2 !px-2'
        wrapperClasses='mx-2'
      />
      <Button
        icon={{
          iconName: 'Check'
        }}
        defautStyle='cust-btn-btn'
        onClick={onSave}
        styleClasses='text-lg !rounded-full !py-2 !px-2'
        wrapperClasses='mx-2'
      />
    </div>
  );
};

export default OKCancelBtn;
