import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { HeaderType } from '../common/types';
import { HomePage } from '../pageContainers';
import { NextSeo } from 'next-seo';
import AppConfig from '../common/appConfig';
import { Props as ProductShowcaseType } from '../pageContainers/home/productShowcase';
import makeSearch from '../common/algolia';
import { ProductListItemType } from '../components/Reusable/ProductListItem/type';
import { analytics } from '../firebase';

const Home = ({
  headerData,
  pageData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

      <HomePage
        headLines={pageData.headLines}
        productShowcase={pageData.productShowcase}
      />
    </section>
  );
};

export interface HomePageData {
  headLines: {
    header: string;
    subheader: string;
    aboutLine: string;
  };
  productShowcase: Array<ProductShowcaseType>;
}

type Props = {
  headerData: HeaderType;
  pageData: HomePageData;
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  // must be async
  console.log(context);

  // setting header data
  // TODO set proper content
  let headerData: HeaderType = {
    title: AppConfig.HOME.headerData.title,
    canonical: '',
    meta: {
      desc: AppConfig.HOME.aboutLine,
      og: {
        title: AppConfig.HOME.headerData.title,
        description: AppConfig.HOME.aboutLine,
        images: [],
        url: ''
      }
    }
  };

  let pageData: HomePageData = {
    headLines: {
      header: AppConfig.HOME.hL1,
      subheader: AppConfig.HOME.hL2,
      aboutLine: AppConfig.HOME.aboutLine
    },
    productShowcase: []
  };

  // fetching the content from algolia
  let ps: Array<ProductShowcaseType> = [];

  let promises = [];

  for (let i = 0; i < AppConfig.HOME.showcase.length; i++) {
    let si: any = {};
    let showItem = AppConfig.HOME.showcase[i];

    si.title = showItem.title;
    si.seeAllTitle = showItem.seeAllTitle;
    si.seeAllLink = showItem.seeAllLink;
    si.products = [];

    promises.push(
      makeSearch(showItem.queryParams, {
        hitsPerPage: 6
      })
    );

    ps.push(si as ProductShowcaseType);
  }

  let res = await Promise.allSettled(promises);

  res.forEach((r: any, i) => {
    if (r && r.status === 'fulfilled') {
      const hits = r.value.hits as Array<ProductListItemType>;
      ps[i].products = hits;
    }
  });

  pageData.productShowcase = ps;

  return {
    props: { headerData, pageData },
    revalidate: 864000 // revalidate after 10 days
  };
};

export default Home;
