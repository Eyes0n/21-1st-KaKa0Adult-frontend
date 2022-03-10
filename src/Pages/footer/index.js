import { Link } from 'next/link';

const LoginFooter = () => {
  return (
    <footer>
      <div>
        <Link href="/">
          <a>이용약관</a>
        </Link>
        <Link href="/">
          <a>X개인정보 처리방침</a>
        </Link>
        <Link href="/">
          <a>X운영정책</a>
        </Link>
        <Link href="/">
          <a>X고객센터</a>
        </Link>
        <Link href="">
          <a>X공지사항</a>
        </Link>
      </div>
      <small>
        Copyright ©
        <Link href="/">
          <a>XPet Shop Corp.</a>
        </Link>
        All rights reserved.
      </small>
    </footer>
  );
};
export default LoginFooter;
