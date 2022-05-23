export const mapAnswer = (answer, question) => {
  let res = [];
  let arr = [];

  for (let i = 0; i < question.length; i++) {
    arr.push([]);
  }

  for (let item of answer) {
    for (let row of item) {
      arr[parseInt(row.no) - 1].push(row.result);
    }
  }

  question.forEach((item) => {
    res.push({
      no: item.no,
      question: item.question,
      answer: arr[item.no - 1],
      type: item.type,
    });
  });

  return res;
};
