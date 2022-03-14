import { useRouter } from 'next/router';
import MyPageFooter from '../components/pageComponents/mypage/Footer';
import Footer from '../components/common/Footer';
import '../styles/Common.scss';
import '../styles/reset.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const mypageOrProductIdRegex = /(\/mypage)|(\/products\/\d+)/;

  return (
    <>
      <Head>
        <title>KoKoo Pet Shop</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="KoKoo Pet Shop clone using NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      {asPath.match(mypageOrProductIdRegex) ? <MyPageFooter /> : <Footer />}
    </>
  );
}

export default MyApp;
