import newProducts from './newProducts.json';

export default function handler(req, res) {
  const { tab } = req.query;

  if (tab === 'new') {
    res.status(200).json(newProducts);
  } else if (tab === 'hot') {
    res.status(200).json(newProducts);
  } else {
    res.status(200).json(newProducts);
  }
}
