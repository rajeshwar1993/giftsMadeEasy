import type { NextPage } from 'next';

import { SectionTitle, Text } from '../../components';
import AddProductContainer from '../../pageContainers/admin/addProducts';

const AddProducts: NextPage = () => {
  return (
    <div>
      <SectionTitle content='Add Products' />
      <AddProductContainer />
    </div>
  );
};

export default AddProducts;
