import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/6/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n\n'))
    .then(response => response.filter(Boolean))
    .then(response => response.map(line => line.split('\n').filter(Boolean)))
    .then(response => response.map((group, index) => {
      if (group.length === 1) {
        return { group, count: group[0].length };
      }

      if (index === response.length - 1) {
        console.log(group);
      }

      let count = 0;
      const first = group.shift();

      for(let i = 0; i < first.length; i++) {
        const letter = first[i];
        const found = group.every(item => item.includes(letter));
        if (found) {
          count++;
        }
      }
      return {
        group: [first, ...group],
        count
      };
    }));

    console.log(data);
  console.log(data.reduce((acc, current) => acc + current.count, 0));
})();