import { PIE_COLOR } from "@const";

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
    } else if (item.type === "Pilihan ganda") {
      data = pieConverter(data, item.option);
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
    labels: Array.from({ length: nScale }, (_, i) => i + 1),
    datasets: [
      {
        data: arr,
      },
    ],
  };
};

export const pieConverter = (answer, option) => {
  let arr = [];
  for (let i = 0; i < option.length; i++) {
    arr.push(0);
  }

  answer.forEach((item) => {
    arr[item - 1] += 1;
  });

  let res = [];
  option.forEach((item, index) => {
    res.push({
      name: `% ${item}`,
      percentage: (arr[index] / arr.reduce((x, y) => x + y)) * 100,
      color: PIE_COLOR[index],
      legendFontColor: "#94A3B8",
      legendFontSize: 12,
    });
  });

  return res;
};

const answers = [
  {
    name: "% Poodle",
    percentage: 20,
    color: "#6E61E8",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Corgi",
    percentage: 30,
    color: "#A889FF",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Westi",
    percentage: 10,
    color: "#E86181",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Pomeranian",
    percentage: 30,
    color: "#F9AD5D",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
  {
    name: "% Samoyed",
    percentage: 10,
    color: "#4ECDC4",
    legendFontColor: "#94A3B8",
    legendFontSize: 12,
  },
];
