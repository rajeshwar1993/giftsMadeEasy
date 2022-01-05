import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { PageProps as Props } from '../../core/pageFormats/types';

import AuthComponent from '../../custom_client_code/component_overrides/AuthComponent';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SectionTitle } from '../../core/components';

const Signup: NextPage<Props> = () => {
  const router = useRouter();

  const { data: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // mode user to profile page if already signed in
    if (user) {
      router.replace('/profile');
    }
  }, [user]);

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
