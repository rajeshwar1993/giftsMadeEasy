import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SectionTitle, Text } from '../../components';

const Admin: NextPage = () => {
  return (
    <div>
      <SectionTitle content='Admin Section' />
      <div className='flex space-x-12'>
        <Link href='/admin/allProducts'>
          <Text content='All Products' styleClasses='cursor-pointer' />
        </Link>
        <Link href='/admin/addProducts'>
          <Text content='ADD Products' styleClasses='cursor-pointer' />
        </Link>
      </div>
    </div>
  );
};

export default Admin;
