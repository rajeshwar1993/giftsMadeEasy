import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import Badge from '../../component_overrides/Bagde';

const { ImageComponent, Text, Button, SectionTitle } = AllComponents;

const ProfileDetailsSection = () => {
  return (
    <div>
      <SectionTitle content='About' />

      <div className='mb-6'>
        <Text
          content='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
          tag='h3'
          styleClasses='text-xl'
        />
      </div>
      {/* Likes */}
      <div>
        <SectionTitle content='Interested In' />

        <div className='mb-2'>
          <Badge
            text={{
              content: 'Tech'
            }}
          />
          <Badge
            text={{
              content: 'Art'
            }}
          />
          <Badge
            text={{
              content: 'Travel'
            }}
          />
          <Badge
            text={{
              content: 'Books'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
