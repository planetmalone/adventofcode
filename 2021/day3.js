import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
      'https://adventofcode.com/2021/day/3/input',
      {
        headers: {
          cookie: 'session=53616c7465645f5f797e36ac9412ba7ae6a0f8a9e2f9b16f9b255d7e76dde07650128d2a311d26f2fd228c6dd0c73698'
        }
      }
  )
      .then(response => response.text());

  const response2 = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

  const input = response.split('\n');
  // input.pop();
  let gamma = '';
  let epsilon = '';

  for (let i = 0; i < input[0].length; i++) {
    let ones = 0;
    let zeros = 0;

    for (let j = 0; j < input.length; j++) {
      if (input[j][i] === '0') {
        zeros++;
      } else {
        ones++;
      }
    }
    if (zeros > ones) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }

  console.log(`Part 1: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`);

  // Part 2
  let o2Codes = [...input];
  let co2Codes = [...input];

  for (let i = 0; i < input[0].length; i++) {
    let ones = 0;
    let zeros = 0;

    for (let j = 0; j < o2Codes.length; j++) {
      if (o2Codes[j][i] === '0') {
        zeros++;
      } else {
        ones++;
      }
    }

    if (zeros > ones) {
      o2Codes = o2Codes.filter(code => code[i] === '0');
    } else {
      o2Codes = o2Codes.filter(code => code[i] === '1');
    }

    if (o2Codes.length === 1) {
      break;
    }
  }

  for (let i = 0; i < input[0].length; i++) {
    let ones = 0;
    let zeros = 0;

    for (let j = 0; j < co2Codes.length; j++) {
      if (co2Codes[j][i] === '0') {
        zeros++;
      } else {
        ones++;
      }
    }

    if (zeros > ones) {
      co2Codes = co2Codes.filter(code => code[i] === '1');
    } else {
      co2Codes = co2Codes.filter(code => code[i] === '0');
    }

    if (co2Codes.length === 1) {
      break;
    }
  }

  console.log(`Part 2: ${parseInt(o2Codes[0], 2) * parseInt(co2Codes[0], 2)}`);
})();
