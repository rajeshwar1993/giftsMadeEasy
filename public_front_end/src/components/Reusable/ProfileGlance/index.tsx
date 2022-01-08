import Link from 'next/link';
import React, { FC } from 'react';
import { Text, ImageComponent } from '../..';
import DataConfig from '../../../common/componentConfig';
import CircleUser from '../../../models/CircleUser';
import Button from '../Button';
import { getOptionFromValue } from '../ListBox/utils';

type Props = {
  data: CircleUser;
};

const ProfileGlance: FC<Props> = ({ data }) => {
  return (
    <div className='flex flex-col items-center text-center  hover:shadow-xl p-4'>
      <Link href={`/profile/${data.uid}`}>
        <div className='cursor-pointer'>
          <div className='shadow-lg w-24 h-24 xl:w-32 xl:h-32 overflow-hidden border-4 rounded-full'>
            <ImageComponent
              src={data.imgUrl || '/images/person.jpg'}
              alt={'alt'}
            />
          </div>

          <Text
            content={data.name || 'No name yet'}
            tag='h3'
            styleClasses='text-xl font-semibold'
          />
          <Text
            content={
              'My ' +
              getOptionFromValue(DataConfig.relationship, data.relation, '')
                .name
            }
            tag='h3'
            styleClasses='text-lg font-light'
          />
        </div>
      </Link>
      <Button text='Find Gifts' defautStyle='cust-btn-link' />
    </div>
  );
};

export default ProfileGlance;
