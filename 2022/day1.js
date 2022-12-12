import { fetchInput } from "../fetch.js";

(async () => {
  const input  = await fetchInput('2022', 1, '53616c7465645f5f3b9f0530341709538f82bbe0e61e37dae866497be1f608c0ca0df5c11be63fe35b9de223465539d9d619c933ef71ef291cb655604a7414ea');
  const elves = input
      .split('\n\n')
      .map(elf => elf.split('\n').map(Number).reduce((sum, current) => sum + current, 0))
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((sum, current) => sum + current, 0);

  console.log(elves);
})();