import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from 'next';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { ParsedUrlQuery } from 'querystring';
import { FS_PRODUCTS_DB } from '../../common/constants';

import { db } from '../../firebase';
import { ProductPage } from '../../pageContainers';
import { HeaderType } from '../../common/types';
import Product, { convertProductJsonToObj } from '../../models/Product';
import AppConfig from '../../common/appConfig';
import { useRouter } from 'next/router';
import { NextSeo, ProductJsonLd } from 'next-seo';
import {
  ageGrpFilterValues,
  interestFilterValues,
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';

const ProductLanding = ({
  headerData,
  pageData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <NextSeo
        title={headerData.title}
        canonical={headerData.canonical}
        description={headerData.meta.desc}
        openGraph={{
          url: headerData.meta.og.url,
          title: headerData.meta.og.title,
          description: headerData.meta.og.description,
          images: headerData.meta.og.images
        }}
      />
      <ProductJsonLd
        productName={pageData.title}
        images={pageData.productImgUrls}
        description={pageData.desc}
        aggregateRating={{
          ratingValue: pageData.rating
        }}
      />
      <ProductPage product={pageData} />
    </section>
  );
};

interface Params extends ParsedUrlQuery {
  productId: string;
}

interface Props {
  headerData: HeaderType;
  pageData: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO - currently fetching all the docs in products DB
  // TODO - change it to only most populat products so that build time is less

  const collectionRef = collection(db, FS_PRODUCTS_DB);
  const productsSnap = await getDocs(collectionRef);
  let paths: Array<{ params: { productId: string } }> = [];

  productsSnap.forEach(snap => {
    paths.push({ params: { productId: snap.id } });
  });

  return {
    paths: paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  let { productId } = params!;

  let data: any = {};

  const docRef = doc(db, FS_PRODUCTS_DB, productId);
  const productSnap = await getDoc(docRef);

  if (productSnap.exists()) {
    data = productSnap.data();
    data.uid = productSnap.id;
  }

  data.cTS = data.cTS.toDate().toISOString();

  let pageData = convertProductJsonToObj(data, data.uid);
  // convert tag keys to values
  // relationship tags
  let tags: Array<string> = [];
  pageData.relationshipTags.forEach(rel => {
    let val = relationshipFilterValues.get(rel);
    if (val) {
      tags.push(val);
    }
  });
  pageData.relationshipTags = tags;

  // occasion tags
  tags = [];
  pageData.occasionTags.forEach(occ => {
    let val = occasionFilterValues.get(occ);
    if (val) {
      tags.push(val);
    }
  });
  pageData.occasionTags = tags;

  // interest tags
  tags = [];
  pageData.interestTags.forEach(int => {
    let val = interestFilterValues.get(int)?.name;
    if (val) {
      tags.push(val);
    }
  });
  pageData.interestTags = tags;

  // ageGrp tags
  tags = [];
  pageData.ageTags.forEach(age => {
    let val = ageGrpFilterValues.get(age);
    if (val) {
      tags.push(val);
    }
  });
  pageData.ageTags = tags;

  // setting header data
  // TODO set proper content
  let headerData: HeaderType = {
    title: `${pageData.title} | ${AppConfig.COMMON.appName}`,
    canonical: '',
    meta: {
      desc: `An ideal gift for your ${pageData.relationshipTags.join(
        ', '
      )}. Best for occasions like ${pageData.occasionTags.join(', ')}.`,
      og: {
        title: `${pageData.title} | ${AppConfig.COMMON.appName}`,
        description: `An ideal gift for your ${pageData.relationshipTags.join(
          ', '
        )}. Best for occasions like ${pageData.occasionTags.join(', ')}.`,
        images: pageData.productImgUrls.map(piu => ({
          url: piu,
          alt: pageData.title
        })),
        url: ''
      }
    }
  };

  return {
    props: { headerData, pageData },
    revalidate: 864000 // revalidate after 10 days
  };
};

export default ProductLanding;
