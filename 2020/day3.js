import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
    'https://adventofcode.com/2020/day/3/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text());

  const rows = response.split('\n');
  let column = 0;
  let hits = 0;
  rows.forEach(row => {
    if (row[column % row.length] === '#') {
      hits++;
    }

    column += 3;
  });

  let hits2 = 0;
  column = 0;
  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    if (row[column % row.length] === '#') {
      hits2++;
    }

    column += 1;
  }

  let hits3 = 0;
  column = 0;
  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    if (row[column % row.length] === '#') {
      hits3++;
    }

    column += 5;
  }

  let hits4 = 0;
  column = 0;
  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    if (row[column % row.length] === '#') {
      hits4++;
    }

    column += 7;
  }

  let hits5 = 0;
  column = 0;
  for (let i = 0; i < rows.length - 1; i = i + 2) {
    const row = rows[i];
    if (row[column % row.length] === '#') {
      hits5++;
    }

    column += 1;
  }

  console.log({ hits, hits2, hits3, hits4, hits5 });
  console.log(hits * hits2 * hits3 * hits4 * hits5);
})();
