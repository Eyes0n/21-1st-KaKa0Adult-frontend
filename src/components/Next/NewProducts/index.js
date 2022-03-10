const NewProducts = ({ items }) => {
  return (
    <div>
      <div>NewProducts</div>
      <ul>
        {items?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewProducts;
