import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        {/* <title>{headerData.title}</title>
        <meta name='description' content={headerData.metaDesc} />
        <link rel='icon' href={headerData.fav || '/favicon.ico'} /> */}
      </Head>
      <h1>About Page</h1>
    </div>
  );
};

// export const getStaticProps: GetStaticProps<Props> = async context => {
//   // must be async
//   console.log(context);

//   let { headerData, sections } = pageConfig.home;

//   return {
//     props: { headerData, sections }
//   };
// };

export default Home;
