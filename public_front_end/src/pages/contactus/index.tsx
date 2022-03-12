import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import AppConfig from '../../common/appConfig';
import { HeaderType } from '../../common/types';
import ContactUsWrapper from '../../pageContainers/contactus';

const ContactUs = ({
  headerData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section>
      <NextSeo
        title={headerData.title}
        canonical={headerData.canonical}
        description={headerData.meta.desc}
      />
      <ContactUsWrapper />
    </section>
  );
};

interface Props {
  headerData: HeaderType;
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  // must be async
  console.log(context);

  let headerData: HeaderType = {
    title: `Contact Us | ${AppConfig.HOME.headerData.title}`,
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    meta: {
      desc: `Contact us regarding any query you might have.`,
      og: {
        title: 'Contact Us',
        description: `Contact us regarding any query you might have.`,
        images: [],
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`
      }
    }
  };

  return {
    props: { headerData }
  };
};

export default ContactUs;
