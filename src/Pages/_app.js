import { useRouter } from 'next/router';
import MyPageFooter from '../components/pageComponents/mypage/Footer';
import Footer from '../components/common/Footer';
import '../styles/Common.scss';
import '../styles/reset.scss';

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const mypageOrProductIdRegex = /(\/mypage)|(\/products\/\d+)/;

  return (
    <>
      <Component {...pageProps} />
      {asPath.match(mypageOrProductIdRegex) ? <MyPageFooter /> : <Footer />}
    </>
  );
}

export default MyApp;
