import { format } from 'date-fns';
import React, { FC, useState, useRef } from 'react';
import { Button, Icon, SectionTitle, Text } from '../../components';

type Props = {
  dobVal: string;
  relVal: string;
  dobRef: any;
  relRef: any;
  editMode: boolean;
};

const ProfileImpDatesSection: FC<Props> = ({
  dobVal,
  relVal,
  dobRef,
  relRef,
  editMode
}) => {
  return (
    <div className=''>
      <div className='mb-10 '>
        {!editMode && (
          <div className='flex flex-row space-y-0 md:flex-col md:space-y-6 xl:space-y-0 xl:flex-row justify-around'>
            <div className='flex flex-col justify-center items-center '>
              <Icon iconName='Cake' size='60' />
              <Text
                content={
                  dobVal ? format(new Date(dobVal), 'MMMM do') : 'Set Birthday'
                }
                styleClasses='text-base'
              />
              <Button
                text='Find Birthday Gifts'
                link={'/search'}
                styleClasses='text-sm'
                defautStyle='cust-btn-link'
              />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Icon iconName='OutlineFavorite' size='60' />
              <Text
                content={
                  relVal
                    ? format(new Date(relVal), 'MMMM do')
                    : 'Set Relationship Date'
                }
                styleClasses='text-base'
              />
              <Button
                text='Find Anniversary Gifts'
                link={'/search'}
                styleClasses='text-sm'
                defautStyle='cust-btn-link'
              />
            </div>
          </div>
        )}
        {editMode && (
          <div className='flex flex-col'>
            <div className='flex flex-col mb-6 '>
              <Text content='Birthday' styleClasses='font-semibold text-lg' />
              <input
                type={'date'}
                defaultValue={
                  dobVal ? format(new Date(dobVal), 'yyyy-MM-dd') : ''
                }
                className='mt-2 border-2 border-skin-accent rounded-lg'
                ref={dobRef}
              />
              <Text
                content='The Year is not displayed on profile.'
                styleClasses='font-semibold text-sm'
              />
            </div>
            <div className='flex flex-col mb-6 '>
              <Text
                content='Relationship'
                styleClasses='font-semibold text-lg'
              />
              <input
                type={'date'}
                defaultValue={
                  relVal ? format(new Date(relVal), 'yyyy-MM-dd') : ''
                }
                className='mt-2 border-2 border-skin-accent rounded-lg'
                ref={relRef}
              />
              <Text
                content='The Year is not displayed on profile.'
                styleClasses='font-semibold text-sm'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImpDatesSection;
