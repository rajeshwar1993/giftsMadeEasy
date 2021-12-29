import '../styles/globals.css';
import type { AppProps } from 'next/app';
import All from '../core_custom_mixer/components';
import { layoutConfig } from '../custom_client_code/pageConfigs';

function MyApp({ Component, pageProps }: AppProps) {
  const { Layout } = All;

  return (
    <div className='text-skin-primary bg-skin-fill'>
      <Layout config={layoutConfig}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
