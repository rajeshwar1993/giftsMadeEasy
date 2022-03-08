import Link from 'next/link';
import React, { FC } from 'react';
import { SectionTitle, Text } from '../../components';

const TrendingSearches = () => {
  return (
    <div className=''>
      <SectionTitle content='Trending Searches' />

      <div className='mt-4 w-full grid grid-cols-2 xl:grid-cols-4 grid-flow-row gap-4 xl:gap-6'>
        <TrendingSearchBox
          text='A Birthday gift for my Daughter.'
          styleClass='col-span-2'
          fontSizeClass='text-xl xl:text-3xl'
          link={'/search?rt=rel_gf&ot=occ_b'}
        />
        <TrendingSearchBox
          text='A Special gift for my Father on his Retirement.'
          link={'/search?rt=rel_fa&ot=occ_ret'}
        />
        <TrendingSearchBox
          text='Something natural and hand made for my Mother.'
          styleClass='row-span-2'
          fontSizeClass='text-xl xl:text-3xl'
          link={
            '/search?rt=rel_mo&it=nah_pott&it=nah_pln&it=nah_efnd&it=nah_hndp&it=nah_bmjt&it=nah_well&it=nah_fgcd'
          }
        />
        <TrendingSearchBox
          text='Toys or Sports gifts for my Son.'
          link={
            '/search?rt=rel_s&it=tgs_tgc&it=tgs_pbg&it=tgs_odg&it=tgs_rct&it=tgs_daf&it=tgs_bdcdg&it=tgs_aot'
          }
        />
        <TrendingSearchBox
          text='A cute gift for my Girlfriend for a special day.'
          styleClass='row-span-2 col-span-2'
          fontSizeClass='text-3xl xl:text-6xl'
          link={
            '/search?rt=rel_gf&ot=occ_a&at=age_A&it=nah_pln&it=nah_hndp&it=khl_chpd&it=khl_rafg&it=cff_facc&it=cff_qqts&it=cff_jwel&it=cff_bpwt&it=bbsg_ssbp&it=bbsg_hpac'
          }
        />
        <TrendingSearchBox
          text='A classy Farewell gift for my Colleague.'
          link={'/search?rt=rel_col&ot=occ_f'}
        />
        <TrendingSearchBox
          text='Fictional books or fun board games!'
          link={'/search?it=tgs_bdcdg&it=bcp_bsbk&it=bcp_fift'}
        />
      </div>
    </div>
  );
};

type SearchBoxType = {
  text: string;
  styleClass?: string;
  fontSizeClass?: string;
  link: string;
};

const TrendingSearchBox: FC<SearchBoxType> = ({
  text,
  styleClass,
  fontSizeClass = 'text-xl xl:text-3xl',
  link
}) => {
  return (
    <Link href={link}>
      <div
        className={`relative bg-skin-inverted bg-opacity-5 hover:text-skin-inverted hover:bg-opacity-100 text-skin-primary flex justify-center items-center p-2 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden text-center ${styleClass} ${fontSizeClass}`}
      >
        {text}
      </div>
    </Link>
  );
};

export default TrendingSearches;
