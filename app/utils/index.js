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
    let data = arr[item.no - 1];

    if (item.type === "Kotak centang") {
      data = checkListConverter(data, item.option);
    } else if (item.type === "Skala linier") {
      data = scaleConverter(data, item.number_of_scales);
    }

    res.push({
      no: item.no,
      question: item.question,
      answer: data,
      type: item.type,
    });
  });

  return res;
};

export const checkListConverter = (answer, labels) => {
  let arr = [];
  for (let i = 0; i < labels.length; i++) {
    arr.push(0);
  }

  answer.forEach((item) => {
    item.forEach((row) => {
      arr[row - 1] += 1;
    });
  });

  return {
    labels: labels,
    datasets: [
      {
        data: arr,
      },
    ],
  };
};

export const scaleConverter = (answer, nScale) => {
  let arr = [];
  for (let i = 0; i < nScale; i++) {
    arr.push(0);
  }

  answer.forEach((item) => {
    arr[item - 1] += 1;
  });

  return {
    labels: Array.from({length: nScale}, (_, i) => i + 1),
    datasets: [
      {
        data: arr,
      },
    ],
  };
};

// Bar
const answers2 = {
  labels: ["Anjing", "Hamster", "Kucing", "Ikan", "Lainnya"],
  datasets: [
    {
      data: [80, 35, 75, 50, 15],
    },
  ],
};
