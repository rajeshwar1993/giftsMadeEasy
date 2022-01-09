import { format } from 'date-fns';
import React, { FC, useState, useRef } from 'react';
import { Button, Icon, SectionTitle, Text } from '../../components';

type Props = {
  dob: string;
  relDate: string;
  onSaveClick: (dob: string, relDate: string) => void;
  isMe: boolean;
};

const ProfileImpDatesSection: FC<Props> = ({
  dob,
  relDate,
  onSaveClick,
  isMe
}) => {
  const [editMode, toggleEditMode] = useState(false);
  const [dobVal, updateDobVal] = useState(dob);
  const [relVal, updateRelVal] = useState(relDate);

  const dobRef = useRef<any>(null);
  const relRef = useRef<any>(null);

  return (
    <div className='xl:max-w-fit'>
      <div className={`flex flex-row justify-between items-center`}>
        <SectionTitle content='Dates' />
        <div>
          {!editMode && isMe && (
            <Button
              icon={{
                iconName: 'Pencil'
              }}
              defautStyle='cust-btn-btn'
              onClick={() => {
                toggleEditMode(true);
              }}
              styleClasses='text-lg !rounded-full !py-2 !px-2'
              wrapperClasses='mx-2'
            />
          )}
          {editMode && (
            <div className='flex'>
              <Button
                icon={{
                  iconName: 'Close'
                }}
                defautStyle='cust-btn-btn'
                onClick={() => {
                  toggleEditMode(false);
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2'
              />
              <Button
                icon={{
                  iconName: 'Check'
                }}
                defautStyle='cust-btn-btn'
                onClick={() => {
                  toggleEditMode(false);
                  updateDobVal(dobRef.current!.value);
                  updateRelVal(relRef.current!.value);
                  const ds = new Date(dobRef.current!.value).toISOString();
                  const rs = new Date(relRef.current!.value).toISOString();
                  onSaveClick(ds, rs);
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2'
              />
            </div>
          )}
        </div>
      </div>

      <div className='mb-10 '>
        {!editMode && (
          <div className='flex flex-row xl:mr-20'>
            <div className='flex flex-col justify-center items-center pr-10'>
              <Icon iconName='Cake' size='80' />
              <Text
                content={
                  dobVal ? format(new Date(dobVal), 'MMMM do') : 'Set Birthday'
                }
                styleClasses='text-xl'
              />
              <Button
                text='Find Birthday Gifts'
                link={'/search'}
                styleClasses='text-sm'
                defautStyle='cust-btn-link'
              />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Icon iconName='OutlineFavorite' size='80' />
              <Text
                content={
                  relVal
                    ? format(new Date(relVal), 'MMMM do')
                    : 'Set Relationship Date'
                }
                styleClasses='text-xl'
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
          <div className='flex flex-col xl:flex-row'>
            <div className='flex flex-col mb-6 xl:w-1/3 xl:mr-14'>
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
            <div className='flex flex-col mb-6 xl:w-1/3'>
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
