import { NextSeo } from 'next-seo';
import AppConfig from '../../common/appConfig';

import { SearchPage } from '../../pageContainers';

const Search = () => {
  return (
    <div>
      <NextSeo
        title={AppConfig.HOME.headerData.title}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/search`}
        description={AppConfig.HOME.aboutLine}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
          title: AppConfig.HOME.headerData.title,
          description: AppConfig.HOME.aboutLine,
          images: []
        }}
      />
      <SearchPage />
    </div>
  );
};

// export interface Props {
//   headerData: HeaderType;
// }

// export const getServerSideProps: GetServerSideProps<Props> = async context => {
//   // must be async
//   console.log('context:', context.query);

//   // setting header data
//   // TODO set proper content
//   let headerData: HeaderType = {
//     title: AppConfig.HOME.headerData.title,
//     canonical: '',
//     meta: {
//       desc: AppConfig.HOME.aboutLine,
//       og: {
//         title: AppConfig.HOME.headerData.title,
//         description: AppConfig.HOME.aboutLine,
//         images: [],
//         url: ''
//       }
//     }
//   };
//   return {
//     props: { headerData }
//   };
// };

export default Search;
