import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
    'https://adventofcode.com/2020/day/1/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text());
  const input = response.split('\n').map(x => Number(x));
  const addends = [];
  input.forEach(first => {
    input.forEach(second => {
      input.forEach(third => {
        if (first + second + third === 2020) {
          addends.push(first);
          addends.push(second);
          addends.push(third);
        }
      });
    });
  });

  console.log(addends[0] * addends[1] * addends[2]);
})();
