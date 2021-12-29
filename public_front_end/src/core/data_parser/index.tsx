import strapiParser from './strapi/index';

export enum DataSource {
  CONFIG = 'config',
  STRAPI = 'strapi'
}

const getDataParser: Function = (dataSource: DataSource, fetchedData: any) => {
  switch (dataSource) {
    case DataSource.CONFIG:
      return fetchedData;

    case DataSource.STRAPI:
      return strapiParser(fetchedData);

    default:
      return fetchedData;
  }
};

export default getDataParser;
