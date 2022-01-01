import { NextPage } from 'next';
import React from 'react';
import AllComponents from '../../core_custom_mixer/components';

import { PageProps as Props } from '../../core/pageFormats/types';

import AuthComponent from '../../custom_client_code/component_overrides/AuthComponent';

const { SectionTitle } = AllComponents;

const Signup: NextPage<Props> = () => {
  return (
    <section className='text-center'>
      <div className='mb-20'>
        <SectionTitle tag='h1' content='TOFA' styleClasses='!text-9xl' />
      </div>
      <AuthComponent />
    </section>
  );
};

export default Signup;
