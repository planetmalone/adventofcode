import { fetchInput } from '../fetch';

const checkAdjacent = (rolls: string[][], x: number, y: number) => {
  let found = 0;
  if (rolls[x - 1]?.[y - 1] === '@') {
    found++;
  }
  if (rolls[x]?. [y - 1] === '@') {
    found++;
  }
  if (rolls[x + 1]?.[y - 1] === '@') {
    found++;
  }
  if (rolls[x - 1]?.[y] === '@') {
    found++;
  }
  if (rolls[x + 1]?.[y] === '@') {
    found++;
  }
  if (rolls[x - 1]?.[y + 1] === '@') {
    found++;
  }
  if (rolls[x]?.[y + 1] === '@') {
    found++;
  }
  if (rolls[x + 1]?.[y + 1] === '@') {
    found++;
  }
  
  return found < 4;
}

(async () => {
  const input = await fetchInput(
    '2025',
    4,
    '53616c7465645f5fb1d44b5620f51effa8eeb723c29637e2b42e96f0518bb450a47b32ab866f1379afe0f8a9c38364c6ca9f620fecf5c7edc28a557249eea61a'
  );
//   const input = `..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.`;

  const rolls = input.split('\n').map(line => line.split(''));
  let total = 0;
  let toRemove = [];
  
  do {
    toRemove = [];
    
    for (let x = 0; x < rolls.length; x++) {
      const row = rolls[x];
    
      for (let y = 0; y < row.length; y++) {
        const roll = row[y];
      
        if (roll === '@') {
          if (checkAdjacent(rolls, x, y)) {
            toRemove.push({ x, y });
          }
        }
      }
    }
    
    toRemove.forEach((pos: { x: number; y: number; }) => {
      rolls[pos.x][pos.y] = "x"
      total++;
    });
  } while (toRemove.length > 0);
  
  console.log(total);
})();
