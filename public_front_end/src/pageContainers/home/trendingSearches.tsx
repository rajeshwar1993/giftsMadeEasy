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
          link={'/search?rt=da&ot=b'}
        />
        <TrendingSearchBox
          text='A Special gift for my Father on his Retirement.'
          link={'/search?rt=fa&ot=ret'}
        />
        <TrendingSearchBox
          text='Something natural and hand made for my Mother.'
          styleClass='row-span-2'
          fontSizeClass='text-xl xl:text-3xl'
          link={
            '/search?rt=mo&it=nah_pott&it=nah_pln&it=nah_efnd&it=nah_hndp&it=nah_bmjt&it=nah_well&it=nah_fgcd'
          }
        />
        <TrendingSearchBox
          text='Toys or Sports gifts for my Son.'
          link={
            '/search?rt=s&it=tgs_bdcdg&it=tgs_daf&it=tgs_rct&it=tgs_edt&it=tgs_odg&it=tgs_pbg&it=tgs_sft&it=tgs_tgc&it=tgs_apl&it=tgs_aot'
          }
        />
        <TrendingSearchBox
          text='A cute gift for my Girlfriend for a special day.'
          styleClass='row-span-2 col-span-2'
          fontSizeClass='text-3xl xl:text-6xl'
          link={
            '/search?rt=gf&it=cff_ttsh&it=cff_facc&it=amc_ptcl&it=tgs_sft&it=tgs_daf&it=nah_pott&it=nah_pln&it=nah_efnd&it=nah_hndp&it=nah_bmjt&it=nah_well&it=nah_fgcd&it=el_bfgeg&it=el_wede&it=bbsg_mkpa&it=bbsg_ssbp&it=bbsg_hpac&it=bbsg_sgp&it=bbsg_fgpr&it=bbsg_edp'
          }
        />
        <TrendingSearchBox
          text='A classy Farewell gift for my Colleague.'
          link={
            '/search?rt=col&it=el_bfgeg&it=el_wede&it=el_gmac&it=el_spear&it=el_tab&it=el_smhd&it=tgs_bdcdg&it=nah_pott&it=nah_efnd&it=nah_bmjt&it=nah_hndp&it=nah_pln&it=nah_fgcd&it=nah_well&it=khl_whgc&it=khl_lplt&it=khl_glgt&it=bbsg_hpac&it=bbsg_sgp&it=bcp_bsbk'
          }
        />
        <TrendingSearchBox
          text='Fictional books or fun board games!'
          link={'/search?it=bcp_fift&it=tgs_bdcdg'}
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
