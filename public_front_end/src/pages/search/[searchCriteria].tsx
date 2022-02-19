import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from 'next';

import { HeaderType } from '../../common/types';
import { FS_DEDICATED_SEARCH_DB } from '../../common/constants';
import { ParsedUrlQuery } from 'querystring';
import fbAdmin from '../../firebaseServer';
import { NextSeo } from 'next-seo';
import AppConfig from '../../common/appConfig';
import DedicatedSearchContainer from '../../pageContainers/search/dedicatedSearchPage';
import DedicatedSearch, {
  convertJsonToDedicatedSearchObj
} from '../../models/DedicatedSearch';
import { DedicatedSearchDBKeys } from '../../common/dbKeys';
import {
  interestFilterValues,
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';

const DedicatedSearchPage = ({
  headerData,
  pageData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!pageData || !pageData.uid) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <NextSeo
        title={headerData.title}
        canonical={''}
        description={headerData.meta.desc}
        openGraph={{
          url: '',
          title: headerData.title,
          description: headerData.meta.og.description,
          images: []
        }}
      />
      <DedicatedSearchContainer title={headerData.title} ds={pageData} />
    </div>
  );
};

const createPageTitleAndMeta = (
  rel: string,
  occ?: string,
  ints?: Array<string>
) => {
  const relVal = relationshipFilterValues.get(rel);
  const occVal = occ ? occasionFilterValues.get(occ) : null;
  const intsVal: Array<string> = [];
  let intsStr = '';
  if (ints) {
    ints.forEach(int => {
      const intVal = interestFilterValues.get(int)?.name;
      if (intVal) intsVal.push(intVal);
    });

    intsStr = intsVal.join(', ');
  }

  const title = `Gift suggestions for your ${relVal}${
    occVal ? ` on the occasion of ${occVal}` : ''
  }`;

  return {
    title,
    desc: `${title}${intsVal.length > 0 ? ` who likes ${intsStr}` : ''}`
  };
};

interface Props {
  headerData: HeaderType;
  pageData: DedicatedSearch;
}
interface Params extends ParsedUrlQuery {
  searchCriteria: string;
  dsId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO - fetch some dedicated searches, or none and let it create on the fly

  const db = fbAdmin.firestore();
  const collRef = db.collection(FS_DEDICATED_SEARCH_DB);

  const dsSnap = await collRef.get();

  let paths: Array<{
    params: {
      searchCriteria: string;
    };
  }> = [];

  if (!dsSnap.empty) {
    dsSnap.forEach(doc => {
      const data = doc.data();
      paths.push({
        params: {
          searchCriteria: encodeURI(data[DedicatedSearchDBKeys.searchCriteria])
        }
      });
    });
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  // must be async
  if (!params) {
    console.log('NO PARAMS!!');
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    };
  }

  let { searchCriteria } = params;

  if (!searchCriteria) {
    console.log('NO SC!!');
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    };
  }

  searchCriteria = decodeURI(searchCriteria);

  let pageData: DedicatedSearch;

  const db = fbAdmin.firestore();
  const collRef = db.collection(FS_DEDICATED_SEARCH_DB);

  const dsSnap = await collRef
    .where(DedicatedSearchDBKeys.searchCriteria, '==', searchCriteria)
    .get();

  if (!dsSnap.empty && dsSnap.size === 1) {
    const doc = dsSnap.docs[0];
    pageData = convertJsonToDedicatedSearchObj(doc.data(), doc.id);
  } else {
    console.log('NO DOC FOUND!!');
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    };
  }

  const pageTitleAndDesc = createPageTitleAndMeta(
    pageData.relationship,
    pageData.occasion,
    pageData.interests
  );

  let headerData: HeaderType = {
    title: `${pageTitleAndDesc.title} || ${AppConfig.COMMON.appName}`,
    canonical: '',
    meta: {
      desc: pageTitleAndDesc.desc,
      og: {
        url: '',
        title: `${pageTitleAndDesc.title} || ${AppConfig.COMMON.appName}`,
        description: pageTitleAndDesc.desc,
        images: []
      }
    }
  };

  return {
    props: { headerData, pageData },
    revalidate: 864000 // revalidate after 10 days
  };
};

export default DedicatedSearchPage;
