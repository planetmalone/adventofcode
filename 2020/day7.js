import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/7/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean))
    .then(response => {
      const rules = {};
      response.forEach(rule => {
        const parts = rule.split(' contain ');
        const bags = parts[1]
            .replace('.', '')
            .replace(/( bags| bag)/g, '')
            .split(', ');
        const mappedBags = [];
        bags.forEach(bag => {
          if (bag !== 'no other') {
            const num = parseInt(bag);
            const color = bag.replace(/\d /g, '');
            for (let i = 0; i < num; i++) {
              mappedBags.push(color);
            }
          }
        });
        rules[parts[0].replace(/ bag[s]?/g, '')] = mappedBags
      });
      return rules;
  });

  const getNumberOfBags = (bags) => {
    if (bags.length === 0) {
      return 0;
    }

    return bags.length + bags.reduce((acc, current) => acc + getNumberOfBags(data[current]), 0);
  };

  const count = getNumberOfBags(data['shiny gold']);
  console.log(count);
})();