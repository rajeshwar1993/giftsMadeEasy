import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SectionTitle, Text } from '../../components';

const Admin: NextPage = () => {
  return (
    <div className='flex flex-col space-y-2'>
      <SectionTitle content='Admin Section' />
      <div className='border-2 border-skin-inverted rounded-lg p-4'>
        <SectionTitle content='Stats' />
      </div>
      <div className='flex space-x-12'>
        <Link href='/admin/productOps'>
          <Text content='Product Operations' styleClasses='cursor-pointer' />
        </Link>
        <Link href='/admin/addProducts'>
          <Text content='ADD Products' styleClasses='cursor-pointer' />
        </Link>
        <Link href='/admin/dedicatedSearchPageAdmin'>
          <Text
            content='Dedicated Search Admin'
            styleClasses='cursor-pointer'
          />
        </Link>
      </div>
    </div>
  );
};

export default Admin;
