import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <header>home</header>
      <Link href="/login">
        <a>login Link</a>
      </Link>
      <br />
      <Link href="/products">
        <a>products Link</a>
      </Link>
    </div>
  );
};

export default Home;
