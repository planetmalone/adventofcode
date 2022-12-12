import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/12/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean));

  const rotate = (cx, cy, x, y, angle) => {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [Math.round(nx), Math.round(ny)];
  }

  const coords = [0, 0];
  let waypoint = [10, 1];
  console.table({ action: [null, null], coords, waypoint });

  const move = (action, value) => {
    switch (action) {
      case 'N':
        waypoint[1] += value;
        break;
      case 'E':
        waypoint[0] += value;
        break;
      case 'S':
        waypoint[1] -= value;
        break;
      case 'W':
        waypoint[0] -= value;
        break;
      case 'R':
        waypoint = rotate(0, 0, waypoint[0], waypoint[1], value);
        break;
      case 'L':
        waypoint = rotate(0, 0, waypoint[0], waypoint[1], value * -1);
        break;
      case 'F':
        for(let i = 0; i < value; i++) {
          coords[0] += waypoint[0];
          coords[1] += waypoint[1];
        }
        break;
    }
  };

  data.forEach(row => {
    const action = row.substr(0, 1);
    const value = parseInt(row.replace(/[a-zA-Z]/g, ''));
    move(action, value);
    console.table({ action: [action, value], coords, waypoint });
  });

  console.log(Math.abs(coords[0]) + Math.abs(coords[1]));
})();