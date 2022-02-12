import React from 'react';
import { APP_NAME } from '../common/constants';
import { ImageComponent, Text } from '../components';
import AppLink from '../components/Reusable/AppLink';

const Custom404 = () => {
  return (
    <section className='flex flex-col space-y-8 justify-center items-center h-96'>
      <ImageComponent
        src='/images/app_logo.png'
        alt={APP_NAME}
        width={300}
        height={150}
        layout='intrinsic'
      />
      <Text content='It seems like you have wandered a long way.' />
      <AppLink link='/' text='let me take you home' />
    </section>
  );
};

export default Custom404;
