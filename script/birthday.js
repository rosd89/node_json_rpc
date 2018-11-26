function getData(index, data, result, range) {
  if (!(range - 1 + index < data.length)) return -1;

  var sum = 0;
  var tempIndex = index;
  var tempRange = range;
  while(tempRange > 0) {
    sum += +data[tempIndex];

    tempIndex++;
    tempRange--;
  }

  if (sum === result) return 1;
  else return 0;
}

function birthday(input) {
  var length = input[0];
  var data = input[1].split(" ");
  var condition = input[2].split(" ");

  var count = 0;
  for (var i = 0; i < length; i++) {
    var result = getData(i, data, +condition[0], +condition[1]);
    if (result === 1) count++;
    else if (result === -1) break;
  }

  return count;
}

const birthday2 = ([length, _data, _condition]) => {
  const data = _data.split(" ").reduce((p, c) => (p.push(+c), p), []);
  const [result, range] = _condition.split(' ');
  return re(data, +result, +range, 0);
};

const re = (data, result, range, acc) => {
  if (data.length === range - 1) return acc;
  else {
    const [_, ...list] = data;
    const sum = data.slice(0, range).reduce((p, c) => p + c, 0);
    if (sum === result) acc++;
    return re(list, result, range, acc)
  }
};

const result = birthday2(['6', '1 1 1 1 1 1', '3 2']);
const result2 = birthday2(['5', '1 2 1 3 2', '3 2']);
const result3 = birthday2(['1', '4', '4 1']);
console.log(result === 0);
console.log(result2 === 2);
console.log(result3 === 1);

// console.log(birthday2(['6', '1 1 1 1 1 1', '3 2']));