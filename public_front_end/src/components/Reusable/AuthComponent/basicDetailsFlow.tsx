import React, { FC, useState } from 'react';
import Button from '../Button';
import SectionTitle from '../SectionTitle';
import { RadioGroup, Transition } from '@headlessui/react';
import { Gender } from '../../../models/enums';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FS_USER_DB } from '../../../common/constants';
import { UserDBKeys } from '../../../common/dbKeys';
import { useAppDispatch } from '../../../redux/store';
import { ur_updateUser } from '../../../redux/user';

const options = [
  {
    text: 'Female',
    value: Gender.Female,
    iconName: 'Female',
    subtext: 'Some nice description'
  },
  {
    text: 'Male',
    value: Gender.Male,
    iconName: 'Male',
    subtext: 'Some nice description'
  }
];

type Props = {
  userId: string;
};

const BasicDetailsFlow: FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const [selected, updateSelected] = useState<Gender>(Gender.Female);
  const [loading, setLoading] = useState(false);

  const saveForm = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const name = e.target[0].value;
      const gender = selected.toString();
      const dob = new Date(e.target[1].value).toISOString();

      const userRef = collection(db, FS_USER_DB);
      await updateDoc(doc(userRef, userId), {
        [UserDBKeys.name]: name,
        [UserDBKeys.gender]: gender,
        [UserDBKeys.dob]: dob
      });
      setLoading(false);
      dispatch(ur_updateUser({ key: UserDBKeys.name, value: name }));
      dispatch(ur_updateUser({ key: UserDBKeys.gender, value: gender }));
      dispatch(ur_updateUser({ key: UserDBKeys.dob, value: dob }));
    } catch (error) {
      console.log(error);
      // TODO handle this error
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col space-y-6 items-center' onSubmit={saveForm}>
      <SectionTitle content='Basic Details' />
      <label htmlFor='fn' className=' w-full'>
        Full Name*
        <input
          type='text'
          id='fn'
          placeholder='John Doe'
          className='rounded-lg w-full'
          required
        />
      </label>
      <RadioGroup
        className={'w-full'}
        value={selected}
        onChange={updateSelected}
        id={'gender'}
      >
        <RadioGroup.Label>Gender*</RadioGroup.Label>
        <div className='flex flex-row space-x-6'>
          {options.map(option => (
            <RadioGroup.Option
              key={option.text}
              value={option.value}
              className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                    : ''
                }
            ${checked ? 'bg-skin-accent text-skin-primary' : 'bg-skin-fill'}
              relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center'>
                      <div className='text-sm'>
                        <RadioGroup.Label
                          as='p'
                          className={`font-medium text-lg  ${
                            checked ? 'text-skin-inverted' : 'text-skin-primary'
                          }`}
                        >
                          {option.text}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as='span'
                          className={`inline ${
                            checked ? 'text-skin-inverted' : 'text-skin-primary'
                          }`}
                        >
                          {/* TODO think of some fun description */}
                          {/* {option.subtext} */}
                        </RadioGroup.Description>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <label htmlFor='dob' className=' w-full'>
        Date of Birth*
        <input
          type={'date'}
          defaultValue={''}
          id='dob'
          placeholder='Date of Birth'
          className='border-2 border-skin-accent rounded-lg  w-full'
          required
        />
      </label>
      <Button
        text='Save'
        styleClasses=' w-48'
        type='submit'
        loading={loading}
      />
    </form>
  );
};

export default BasicDetailsFlow;
