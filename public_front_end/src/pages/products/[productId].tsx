import type { GetServerSideProps, NextPage } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { FS_PRODUCTS_DB } from '../../common/constants';

import { db } from '../../firebase';
import { ProductPage } from '../../pageContainers';
import { HeaderType } from '../../common/types';
import { convertProductJsonToObj } from '../../models/Product';

interface Props {
  headerData: HeaderType;
  pageData: any;
}

const ProductLanding: NextPage<Props> = ({ headerData, pageData }) => {
  let product = convertProductJsonToObj(pageData, pageData.uid);

  return (
    <div>
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
      <ProductPage product={product} />
    </div>
  );
};

interface Params extends ParsedUrlQuery {
  productId: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Params
> = async context => {
  let { productId } = context.params!;

  let headerData,
    pageData: any = {};

  const docRef = doc(db, FS_PRODUCTS_DB, productId);
  const productSnap = await getDoc(docRef);

  if (productSnap.exists()) {
    pageData = productSnap.data();
    pageData.uid = productSnap.id;
  }

  pageData.cTS = pageData.cTS.toDate().toISOString();

  headerData = { title: 'string', metaDesc: 'string' };

  return {
    props: { headerData, pageData }
  };
};

export default ProductLanding;
