import type { NextPage } from 'next';
import { SectionTitle } from '../../components';
import DedicatedSearchAdminContainer from '../../pageContainers/admin/dedicatedSearchAdminContainer';

const DedicatedSearchPageAdmin: NextPage = () => {
  return (
    <div>
      <SectionTitle content='Dedicated Search Combinations' />
      <DedicatedSearchAdminContainer />
    </div>
  );
};

export default DedicatedSearchPageAdmin;
