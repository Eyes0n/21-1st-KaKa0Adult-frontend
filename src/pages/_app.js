import { useRouter } from 'next/router';
import MyPageFooter from '../components/pageComponents/mypage/Footer';
import Footer from '../components/common/Footer';
import '../styles/common.scss';
import '../styles/reset.scss';
import Head from 'next/head';
import Nav from '../components/common/Nav';
import MainTab from '../components/common/MainTab';
import Layout from '../components/common/Layout';

// if (process.env.NODE_ENV === 'development') {
//   (async () => {
//     const { worker } = await import('../mocks/browser');
//     worker.start();
//   })();
// }

if (process.env.NODE_ENV === 'development') {
  require('../mocks');
}

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const mypageOrProductIdRegex = /(\/mypage)|(\/products\/\d+)/;
  const loginOrSignupRegex = /(\/login)|(\/signup)/;

  return (
    <>
      <Head>
        <title>KoKoo Pet Shop</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="KoKoo Pet Shop clone using NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loginOrSignupRegex.test(asPath) ? null : (
        <>
          <Nav />
          <MainTab />
        </>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {asPath.match(mypageOrProductIdRegex) ? <MyPageFooter /> : <Footer />}
    </>
  );
}

export default MyApp;
