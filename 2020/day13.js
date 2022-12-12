import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/13/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response[1].split(','))
    .then(response => response.filter(Boolean));

    const shuttles = [];
    data.forEach((value, index) => {
      if (value !== 'x') {
        shuttles.push({ id: Number(value), offset: Number(index) });
      }
    });


  let found = false;
  let index = 530000000000000;
  while (!found && index < 538703334547789) {
    const found = shuttles.every(shuttle => {
      if (shuttle.id + shuttle.offset > index) {
        return false;
      }

      let min = index;
      while (min % shuttle.id) {
        min++;
      }

      return min === index + shuttle.offset;
    });

    console.log(index, found);
    if (found) {
      break;
    }

    index += shuttles[0].id;
  }
})();