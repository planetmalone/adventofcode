import { fetchInput } from "../fetch";

const numberMap: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

(async () => {
  const input = await fetchInput('2023', 1, '53616c7465645f5f2ed1f63d2dac5145b211c8da179e38c30eea9c64a356e5af1935ec8104217332747d042363b3205e17810533b7f9ef2e800432d7cc915f9f')
  // const input = 'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen'
  const lines = input.split('\n').filter(Boolean);
  let total = 0;

  lines.forEach(line => {
    const pattern = /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g
    const matches = Array.from(line.matchAll(pattern), x => x[1])
    if (matches) {
      const first = matches[0];
      const firstDigit = numberMap[first] ? numberMap[first] : first;
      const last = matches[matches.length - 1];
      const lastDigit = numberMap[last] ? numberMap[last] : last
      total += Number(`${firstDigit}${lastDigit}`)
    }
  })

  console.log(total)
})();