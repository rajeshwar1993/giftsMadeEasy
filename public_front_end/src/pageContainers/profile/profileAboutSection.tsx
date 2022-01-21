import React, { FC, useRef, useState } from 'react';
import { Button, SectionTitle, Text } from '../../components';

type Props = {
  text: string;
  editMode: boolean;
  textRef: any;
};

const ProfileAboutSection: FC<Props> = ({
  text = 'Tell us something about your likes or hobbies so that people can find the right gift for you ...',
  editMode,
  textRef
}) => {
  const [count, updateCount] = useState(text.length);

  return (
    <div>
      <div className='mb-10'>
        {!editMode && (
          <Text
            content={
              text ||
              'Tell us something about your likes or hobbies so that people can find the right gift for you ...'
            }
            tag='h3'
            styleClasses='text-base text-center'
          />
        )}
        {editMode && (
          <div>
            <textarea
              placeholder='Tell us something about your likes or hobbies so that people can find the right gift for you ...'
              defaultValue={text}
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
