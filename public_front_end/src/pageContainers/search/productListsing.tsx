import React, { FC } from 'react';
import AppConfig from '../../common/appConfig';
import { SectionTitle, Text } from '../../components';
import ProductListItem from '../../components/Reusable/ProductListItem';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

type Props = {
  results: Array<ProductListItemType>;
  loading: boolean;
};

const ids = [
  'B09QT2972P',
  'B08DKZB6DN',
  'B09P8G714S',
  'B08VJ58YT9',
  'B08L16S6Y9'
];

type TempProductViewProps = {
  id: string;
  title?: string;
};

export const TempProductView: FC<TempProductViewProps> = ({
  id,
  title = 'TITLE'
}) => {
  return (
    <a
      target='_blank'
      href={`https://www.amazon.in/gp/product/${id}/ref=as_li_tl?ie=UTF8&camp=3638&creative=24630&creativeASIN=${id}&linkCode=as2&tag=tofacircle-21`}
    >
      <div className='pt-4 transition-all duration-200 rounded-lg lg:p-4 lg:hover:shadow-md border-skin-primary border-opacity-0 lg:hover:border-opacity-10 border-2'>
        <div
          className={`flex flex-col space-y-6 items-center h-full justify-between `}
        >
          <img
            src={`//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=IN&ASIN=${id}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=tofacircle-21`}
          />

          <Text
            tag='h4'
            content={title}
            styleClasses='font-semibold text-base line-clamp-4'
          />
          <Text
            content={AppConfig.COMMON.buyNowLabel}
            styleClasses='font-semibold text-base'
          />
        </div>
      </div>
    </a>
  );
};

const ProductListing: FC<Props> = ({ results, loading }) => {
  return (
    <>
      {loading && (
        <div className='flex justify-around mt-12'>
          <SectionTitle content='Fetching Results ...' />
        </div>
      )}
      {!loading && (
        <div className='grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-4  lg:gap-x-8 w-full'>
          {results.map(r => (
            <TempProductView id={r.apid} key={r.apid} title={r.title} />
          ))}
        </div>
      )}
      {results.length > 0 && (
        <div className='mt-16'>
          <Text
            styleClasses='text-xs'
            content={AppConfig.COMMON.priceDisclaimer}
          />
        </div>
      )}
      {results.length === 0 && (
        <SectionTitle
          wrapperClasses='p-6'
          content={AppConfig.SEARCH.noResultsMessage}
        />
      )}
    </>
  );
};

export default ProductListing;
