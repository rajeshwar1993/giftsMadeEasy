import React, { FC } from 'react';
import { Text, ImageComponent } from '../..';
import CircleUser from '../../../models/CircleUser';
import Button from '../Button';

type Props = {
  data: CircleUser;
};

const ProfileGlance: FC<Props> = ({ data }) => {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='shadow-lg w-24 h-24 xl:w-32 xl:h-32 overflow-hidden border-4 rounded-full'>
        <ImageComponent src={data.imgUrl || '/images/person.jpg'} alt={'alt'} />
      </div>

      <Text
        content={data.name || 'No name yet'}
        tag='h3'
        styleClasses='text-xl font-semibold'
      />
      <Text
        content={data.relation}
        tag='h3'
        styleClasses='text-lg font-light'
      />
      <Button text='Find Gifts' defautStyle='cust-btn-link' />
    </div>
  );
};

export default ProfileGlance;
