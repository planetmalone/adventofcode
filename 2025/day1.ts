import { fetchInput } from '../fetch';

(async () => {
  const input = await fetchInput(
    '2025',
    1,
    '53616c7465645f5fb1d44b5620f51effa8eeb723c29637e2b42e96f0518bb450a47b32ab866f1379afe0f8a9c38364c6ca9f620fecf5c7edc28a557249eea61a'
  );
//   const input = `
// L68
// L30
// R48
// L5
// R60
// L55
// L1
// L99
// R14
// L82`;

  const lines = input.split('\n').filter(Boolean);
  const turns = lines.map((i) => ({
    direction: i[0],
    distance: Number(i.substring(1)),
  }));
  let current = 50;
  let zeroes = 0;

  for (const { direction, distance } of turns) {
    const step = direction === 'R' ? 1 : -1;
    for (let i = 0; i < distance; i++) {
      let next = current + step;
      if (next < 0) {
        next = 99;
      }
      if (next > 99) {
        next = 0;
      }
      
      if (next === 0) {
        zeroes++;
      }
      current = next;
    }
  }

  console.log(zeroes);
})();
