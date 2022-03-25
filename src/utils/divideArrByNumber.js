const divideArrByNumber = (dataArr, divisionNumber) => {
  const arr = [];
  const mutation = [...dataArr];

  const iterateNum =
    mutation.length % divisionNumber === 0
      ? mutation.length / 9
      : Math.floor(mutation.length / 9) + 1;

  for (let i = 0; i < iterateNum; i++) {
    arr[i] = mutation.splice(0, divisionNumber);
  }

  return arr;
};

export default divideArrByNumber;
