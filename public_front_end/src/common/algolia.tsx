import algoliasearch from 'algoliasearch/lite';

// TODO move the keys to env variables
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_SECRET || ''
);
const index = client.initIndex('products');

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

const makeSearch = async (filterObj: any, options: any = {}) => {
  return new Promise((response, reject) => {
    index
      .search('', {
        filters: createFilters(filterObj),
        ...options
      })
      .then(hits => {
        response(hits);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export default makeSearch;
