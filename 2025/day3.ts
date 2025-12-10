import { fetchInput } from '../fetch';

(async () => {
  const input = await fetchInput(
    '2025',
    3,
    '53616c7465645f5fb1d44b5620f51effa8eeb723c29637e2b42e96f0518bb450a47b32ab866f1379afe0f8a9c38364c6ca9f620fecf5c7edc28a557249eea61a'
  );
//   const input = `987654321111111
// 811111111111119
// 234234234234278
// 818181911112111`;

  const banks = input.split('\n').map(line => line.split('').map(Number));
  
  let total = 0;
  for (const bank of banks) {
    let trimmedBank = [...bank];
    
    while (trimmedBank.length > 12) {
      let max = Number.NEGATIVE_INFINITY;
      let maxIndex = 0;
    
      for (let i = 0; i < trimmedBank.length; i++) {
        const trimmed = Number(trimmedBank.toSpliced(i, 1).join('') + '0');
        const diff = trimmed - Number(trimmedBank.join(''));
        if (diff > max) {
          max = diff;
          maxIndex = i;
        }
      }
      trimmedBank.splice(maxIndex, 1);
    }
    
    total += Number(trimmedBank.join(''));
  }
  
  console.log(total);
})();
