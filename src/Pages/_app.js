import '../styles/Common.scss';
import '../styles/reset.scss';
import Layout from '../components/Next/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
