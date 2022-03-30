import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API } from '../../../../config';
import { fetchDelete, fetchGet } from '../../../../utils/fetches';
import Empty from '../../../common/Empty';
import styles from './index.module.scss';

const Wish = () => {
  const [wishes, setWishes] = useState([]);

  const getWishesApi = async () => {
    const res = await fetchGet(`${API}/users/like/products`);

    if (res.status === 204) return;
    const data = await res.json();

    setWishes(data);
  };

  useEffect(() => {
    getWishesApi();
  }, []);

  const onCancleLike = async (productId) => {
    const res = await fetchDelete(`${API}/users/like/product/${productId}`);
    if (res.status !== 200) return;

    const newWishes = wishes.filter((wish) => wish.id !== productId);
    setWishes(newWishes);
  };

  const onCancleLikeAll = async () => {
    const promises = [];
    wishes.forEach((wish) =>
      promises.push(fetchDelete(`${API}/users/like/product/${wish.id}`))
    );

    Promise.all(promises).then((res) => {
      const isAllSuccess = [...res].every((res) => res.status === 200);
      if (isAllSuccess) setWishes([]);
    });
  };
  return (
    <>
      {!wishes.length ? (
        <Empty
          message={['찜한 상품이 없습니다.', '신규상품 보러 가실래요?']}
          link={{ url: '/products/new', text: '신규상품 보기' }}
        />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.allDeleteButtonBox}>
            <button
              type="button"
              className={styles.allDeleteButton}
              onClick={onCancleLikeAll}
            >
              전체 삭제
            </button>
          </div>
          <div className={styles.container}>
            {wishes?.map((wish) => (
              <div key={wish.id} className={styles.contentBox}>
                <div className={styles.content}>
                  <Link href={`/products/${wish.id}`}>
                    <a>
                      <div className={styles.image}>
                        <img src={wish.imgSrc} alt={wish.name} />
                      </div>
                      <p className={styles.name}>{wish.name}</p>
                      <p className={styles.price}>{wish.price}원</p>
                    </a>
                  </Link>
                </div>
                <button
                  type="button"
                  className={styles.cancleLikeButton}
                  onClick={() => onCancleLike(wish.id)}
                >
                  좋아요 취소
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wish;
