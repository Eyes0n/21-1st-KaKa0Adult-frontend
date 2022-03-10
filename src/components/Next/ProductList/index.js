const ProductList = ({ itmes }) => {
  const [products, setProducts] = useState([]);

  const toggleProductLike = (updatedId, updatedIndex) => {
    const updatedProducts = products.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );

    setProducts({
      products: updatedProducts,
    });

    const isDeleteProduct = products[updatedIndex].like;

    const res = isDeleteProduct
      ? fetchDelete(`${USER_API}/users/like/product/${updatedId}`)
      : fetchPost(`${USER_API}/users/like/product`, { product_id: updatedId });

    res
      .then((res) => {
        if (res.status === 201) {
          return alert('Like Success');
        } else if (res.status === 204) {
          return alert('Like Cancle Success');
        } else throw new Error(res.message);
      })
      .catch((err) => console.error(err));
  };

  const addToCart = (updatedId, updatedIndex) => {
    const updatedProducts = products.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );

    setProducts({
      products: updatedProducts,
    });

    if (!products[updatedIndex].cart) {
      fetchPost(`${CART_API}/orders/order-items`, {
        product_id: updatedId,
        count: 1,
      })
        .then((res) => {
          if (res.ok) {
            alert('Add Cart Success');
          } else {
            alert('Add Cart Fail');
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <ul>
      {itemList?.map((product, index) => (
        <li key={product.id}>
          <div className="product">
            <div
              className={product.like ? 'heart addToLike' : 'heart'}
              onClick={() => toggleProductLike(product.id, index)}
            >
              <button className="likeBtn" type="button">
                좋아요
              </button>
            </div>

            <Link to={`/products/${product.id}`} className="productLink">
              <div className="productImgWrap">
                <img src={product.image} alt="상품 이미지" />
              </div>
              <p className="productName">{product.name}</p>
              <p className="productPrice">
                <span className="price">
                  {(+product.price)?.toLocaleString()}
                </span>
                <span className="unit">원</span>
              </p>

              {!product.stock && (
                <div className="soldout">
                  <label className="soldoutLabel"></label>
                </div>
              )}
            </Link>

            <div
              className={product.cart ? 'cart addToCart' : 'cart'}
              onClick={() => addToCart(product.id, index)}
            >
              <button className="cartBtn" type="button">
                담기
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
