import { fetchInput } from "../fetch.js";

(async () => {
  const input  = await fetchInput('2022', 2, '53616c7465645f5f3b9f0530341709538f82bbe0e61e37dae866497be1f608c0ca0df5c11be63fe35b9de223465539d9d619c933ef71ef291cb655604a7414ea');
  const rounds = input.split('\n').filter(Boolean);
  let total = 0;
  const choiceScoreMap = {
    A: {
      X: 3,
      Y: 1,
      Z: 2
    },
    B: {
      X: 1,
      Y: 2,
      Z: 3
    },
    C: {
      X: 2,
      Y: 3,
      Z: 1
    }
  };
  const myMap = {
    X: 0,
    Y: 3,
    Z: 6
  };

  rounds.forEach(round => {
    const [a, b] = round.split(' ');
    total += myMap[b] + choiceScoreMap[a][b];
  });

  console.log(total);
})();