import type { NextPage } from 'next';
import { SectionTitle } from '../../components';
import ProductOpsContainer from '../../pageContainers/admin/productOpsContainer';

const AllProducts: NextPage = () => {
  return (
    <div>
      <SectionTitle content='Product Operations' />
      <ProductOpsContainer />
    </div>
  );
};

export default AllProducts;
