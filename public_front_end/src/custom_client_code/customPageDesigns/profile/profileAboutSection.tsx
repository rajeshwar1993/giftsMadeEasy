import React, { FC, useRef, useState } from 'react';
import { Button, SectionTitle, Text } from '../../../core/components';

type Props = {
  text: string;
  onSaveClick: Function;
};

const ProfileAboutSection: FC<Props> = ({
  text = 'Tell us something about your likes or hobbies so that people can find the right gift for you ...',
  onSaveClick
}) => {
  const [editMode, toggleEditMode] = useState(false);
  const [aboutText, updateAboutText] = useState(text);
  const [count, updateCount] = useState(text.length);
  const textRef = useRef<any>(null);

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <SectionTitle content='You' />
        <div>
          {!editMode && (
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
                  updateAboutText(textRef.current.value);
                  onSaveClick(textRef.current.value);
                }}
                styleClasses='text-lg !rounded-full !py-2 !px-2'
                wrapperClasses='mx-2'
              />
            </div>
          )}
        </div>
      </div>

      <div className='mb-10'>
        {!editMode && (
          <Text content={aboutText} tag='h3' styleClasses='text-xl' />
        )}
        {editMode && (
          <div>
            <textarea
              placeholder='Tell us something about your likes or hobbies so that people can find the right gift for you ...'
              defaultValue={aboutText}
              rows={4}
              className='w-full border-2 border-skin-accent rounded-lg text-lg'
              maxLength={300}
              ref={textRef}
              onChange={e => updateCount(e.target.value.length)}
            />
            <Text content={`${count}/300`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAboutSection;
