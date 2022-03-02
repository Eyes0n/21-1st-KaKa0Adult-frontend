export const queryString = (locationSearch) => {
  const qsArr = locationSearch?.split('?')[1].split('&');
  const qsObj = {};

  qsArr
    .map((el) => el.split('='))
    .forEach((el) => {
      qsObj[el[0]] = el[1];
    });

  return qsObj;
};

export const matchParser = (match) => {
  const arr = match.split('/');
  return arr[arr.length - 1];
};
