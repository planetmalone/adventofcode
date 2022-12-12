import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/9/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean))
    .then(response => response.map(Number))

  const preamble = 25;
  let invalid = -1;
  console.log('start');

  for (let i = preamble; i < data.length; i++) {
    let found = false;
    for (let j = i - preamble; j < i; j++) {
      for (let k = i - preamble; k < i; k++) {
        const sum = data[i];
        const add1 = data[j];
        const add2 = data[k];
        if (add1 !== add2 && add1 + add2 === sum) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }

    if (!found) {
      invalid = data[i];
      break;
    }
  }

  let foundAdders = false;
  for (let i = 0; i < data.length; i++) {
    const num = data[i];
    let adders = [num];
    let numAdders = 2;
    let over = false;

    while (!over) {
      let sum = num;
      adders = [num];
      for (let j = i + 1; j < i + numAdders; j++) {
        sum += data[j];
        adders.push(data[j]);
      }
      numAdders++;

      if (sum === invalid) {
        over = true;
        console.log('Finished: ', adders);
        console.log(Math.min(...adders) + Math.max(...adders));
        foundAdders = true;
      } else if (sum > invalid) {
        over = true;
      }
    }

    if (foundAdders) {
      break;
    }
  }
})();