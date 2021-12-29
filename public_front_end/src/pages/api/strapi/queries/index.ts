import homePageQuery from './homePage';

export enum PageName {
  HomePage = 'homePage'
}

export default function (pageName: PageName) {
  let query = '';

  switch (pageName) {
    case PageName.HomePage:
      query = homePageQuery;
      break;
    default:
      query = '';
  }

  query = JSON.stringify({ query });

  return query;
}
