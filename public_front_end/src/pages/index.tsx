import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import getDataParser from '../core/data_parser';

import AllPages from '../core_custom_mixer/pageFormats';
import { PageProps as Props } from '../core/pageFormats/types';
import { DATA_SOURCE } from '../core_custom_mixer/app_config';

const Home: NextPage<Props> = () => {
  const { SectionedPages } = AllPages;
  return (
    <div>
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
    </div>
  );
};

// export const getStaticProps: GetStaticProps<Props> = async context => {
//   // must be async
//   console.log(context);

//   let headerData, sections;

//   let fetchedData = await fetch(
//     `http://localhost:3000/api/${DATA_SOURCE.toString()}/data/homePage`
//   );
//   fetchedData = await fetchedData.json();
//   let parsedData = getDataParser(DATA_SOURCE, fetchedData);
//   headerData = parsedData.headerData;
//   sections = parsedData.sections;

//   return {
//     props: { headerData, sections }
//   };
// };

export default Home;
