import { fetchInput } from '../fetch';

(async () => {
  const input = await fetchInput(
    '2025',
    1,
    '53616c7465645f5f95cc4143d142736ccb0f2f12e1d48cce244f700689fe55f5f6bd0f143c64966c599f47a054cfc35f4a6be151a32918cf6003a6c1ec0fcf23'
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
  // const turns = lines.map((i) => ({
  //   direction: i[0],
  //   distance: Number(i.substring(1)),
  // }));
  // let current = 50;
  // let zeroes = 0;

  // for (const { direction, distance } of turns) {
  //   const next = current + distance * (direction === 'L' ? -1 : 1);

  //   if (direction === 'R') {
  //     zeroes += Math.floor((next) / 100);
  //   } else {
  //     zeroes += Math.floor((next) / 100);
  //   }

  //   current = ((next % 100) + 100) % 100;
  // }

  // console.log(`Current: ${current}`);

  // console.log(zeroes);

  let current = 50;
let zeros = 0;
  for (const line of lines) {
  const dir = line[0];
  const dist = Number(line.slice(1));
  if (dir === 'R') {
    // moving right: count how many multiples of 100 we pass
    zeros += Math.floor((current + dist) / 100);
    current = (current + dist) % 100;
  } else {
    // moving left: how many times we go below 0 by 100s
    if (dist > current) {
      zeros += Math.ceil((dist - current) / 100);
    }
    current = ((current - dist) % 100 + 100) % 100;
  }
}

console.log("Final dial:", current);
console.log("Total zeros (method 0x434C49434B):", zeros);
})();
