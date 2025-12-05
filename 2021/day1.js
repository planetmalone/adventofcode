import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
      'https://adventofcode.com/2021/day/1/input',
      {
        headers: {
          cookie: 'session=53616c7465645f5f797e36ac9412ba7ae6a0f8a9e2f9b16f9b255d7e76dde07650128d2a311d26f2fd228c6dd0c73698'
        }
      }
  )
      .then(response => response.text());
  const response2 = `199
              200
              208
              210
              200
              207
              240
              269
              260
              263`;
  const input = response.split('\n').map(x => Number(x));
  let increases = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases++;
    }
  }

  console.log(`Part 1: ${increases}`);

  // Part 2

  increases = 0;
  for (let i = 1; i < input.length; i++) {
    if (!input[i + 2]) {
      break;
    }

    const sum = input[i] + input[i + 1] + input[i + 2];
    const previousSum = input[i - 1] + input[i] + input[i + 1];
    if (sum > previousSum) {
      increases++;
    }
  }

  console.log(`Part 2: ${increases}`);
})();
