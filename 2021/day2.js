import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
      'https://adventofcode.com/2021/day/2/input',
      {
        headers: {
          cookie: 'session=53616c7465645f5f797e36ac9412ba7ae6a0f8a9e2f9b16f9b255d7e76dde07650128d2a311d26f2fd228c6dd0c73698'
        }
      }
  )
      .then(response => response.text());

  const response2 = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  const input = response.split('\n').map(x => {
    const parts = x.split(' ');
    return {
      direction: parts[0],
      distance: Number(parts[1])
    };
  });

  let finalDestination = input.reduce((location, current) => {
    const { direction, distance } = current;
    const { depth, hoz } = location;

    switch (direction) {
      case 'forward':
        return {
          ...location,
          hoz: hoz + distance
        };
      case 'up':
        return {
          ...location,
          depth: depth - distance
        };
      case 'down':
        return {
          ...location,
          depth: depth + distance
        };
      default:
        return location;
    }
  }, { depth: 0, hoz: 0 });

  console.log(`Part 1: ${finalDestination.depth * finalDestination.hoz}`);

  // Part 2
  finalDestination = input.reduce((location, current) => {
    const { direction, distance } = current;
    const { depth, hoz, aim } = location;

    switch (direction) {
      case 'forward':
        return {
          ...location,
          hoz: hoz + distance,
          depth: depth + aim * distance
        };
      case 'up':
        return {
          ...location,
          aim: aim - distance
        };
      case 'down':
        return {
          ...location,
          aim: aim + distance
        };
      default:
        return location;
    }
  }, { depth: 0, hoz: 0, aim: 0 });

  console.log(`Part 2: ${finalDestination.depth * finalDestination.hoz}`);
})();
