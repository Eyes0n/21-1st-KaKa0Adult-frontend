const HotProducts = ({ items }) => {
  return (
    <div>
      <div>HotProducts</div>
      <ul>
        {items?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HotProducts;
