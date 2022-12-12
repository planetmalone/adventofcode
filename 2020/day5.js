import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/5/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean));

  const results = data.map(seat => {
    const rowAssignment = seat.substr(0, 7);
    const columnAssignment = seat.substr(7);

    const row = getRow(rowAssignment);
    const column = getColumn(columnAssignment);

    return row * 8 + column;
  });

  for (let i = 0; i <= 1023; i++) {
    if (!results.includes(i) && results.includes(i - 1) && results.includes(i + 1)) {
      console.log(i);
    }
  }
})();

const getRow = rowAssignment => {
  let min = 0;
  let max = 127;

  rowAssignment.split('').forEach(item => {
    if (item === 'F') {
      max = max - Math.ceil(((max - min) / 2));
    } else {
      min = min + Math.ceil((max - min) / 2);
    }
  });
  return max;
};

const getColumn = columnAssignment => {
  let min = 0;
  let max = 7;

  columnAssignment.split('').forEach(item => {
    if (item === 'L') {
      max = max - Math.ceil(((max - min) / 2));
    } else {
      min = min + Math.ceil((max - min) / 2);
    }
  });
  return max;
};
