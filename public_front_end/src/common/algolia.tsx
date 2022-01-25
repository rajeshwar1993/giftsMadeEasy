import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('VDPXQ68UV2', '5c05851e956ce5d09efcb79d40f4f024');
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

  return filters.join(' AND ');

  //   return '(rt:f)';
};

const makeSearch = async (filterObj: any) => {
  return new Promise((response, reject) => {
    try {
      index
        .search('', {
          filters: createFilters(filterObj)
        })
        .then(hits => {
          response(hits);
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      // TODO handle error
      console.log(e);
      reject(e);
    }
  });
};

export default makeSearch;
