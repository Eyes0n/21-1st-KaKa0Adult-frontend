import { useRouter } from 'next/router';
import MyPageFooter from '../components/pageComponents/mypage/Footer';
import Footer from '../components/common/Footer';
import '../styles/Common.scss';
import '../styles/reset.scss';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const mypageRegex = /(\/mypage)/;

  return (
    <>
      <Component {...pageProps} />
      {pathname.match(mypageRegex) ? <MyPageFooter /> : <Footer />}
    </>
  );
}

export default MyApp;
