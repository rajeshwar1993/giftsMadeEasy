import type { NextPage } from 'next';

import { SectionTitle, Text } from '../../components';
import AllProductContainer from '../../pageContainers/admin/allProducts';

const AllProducts: NextPage = () => {
  return (
    <div>
      <SectionTitle content='All Products' />
      <AllProductContainer />
    </div>
  );
};

export default AllProducts;
