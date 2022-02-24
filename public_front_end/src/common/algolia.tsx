import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_SECRET || ''
);
const index = client.initIndex('products');
const usersIndex = client.initIndex('users');

const createFilters = (filterObj: any) => {
  let filters: any = [];

  for (let key in filterObj) {
    if (Array.isArray(filterObj[key])) {
      if (filterObj[key].length > 0) {
        let arrQ: any = [];

        filterObj[key].forEach((f: any) => arrQ.push(`(${key}:${f})`));

        filters.push(`(${arrQ.join(' OR ')})`);
      }
    } else if (filterObj[key]) {
      filters.push(`(${key}:${filterObj[key]})`);
    }
  }

  filters.push('(s:a)');

  return filters.join(' AND ');
};

const makeSearch = async (
  filterObj: any,
  options: any = {},
  query: string = ''
) => {
  return new Promise((response, reject) => {
    index
      .search(query, {
        filters: createFilters(filterObj),
        hitsPerPage: 20,
        ...options
      })
      .then(res => {
        response(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const searchUsers = (keyword: string) => {
  return new Promise((response, reject) => {
    usersIndex
      .search(keyword)
      .then(res => response(res))
      .catch(e => reject(e));
  });
};

export default makeSearch;
