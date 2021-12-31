import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AllComponents from '../core_custom_mixer/components';
import { layoutConfig } from '../custom_client_code/pageConfigs';
import '../firebase';
import store from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const { Layout } = AllComponents;

  return (
    <div className='text-skin-primary bg-skin-fill'>
      <Provider store={store}>
        <Layout config={layoutConfig}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}

export default MyApp;
