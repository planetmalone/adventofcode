import { fetchInput } from '../fetch';

(async () => {
  const input = await fetchInput(
    '2025',
    5,
    '53616c7465645f5fb1d44b5620f51effa8eeb723c29637e2b42e96f0518bb450a47b32ab866f1379afe0f8a9c38364c6ca9f620fecf5c7edc28a557249eea61a'
  );
//   const input = `3-5
// 10-14
// 16-20
// 12-18

// 1
// 5
// 8
// 11
// 17
// 32`;

  const [rangeString, idString] = input.split('\n\n');
  
  const ranges = rangeString.split('\n').map((range: string) => {
    const parts = range.split('-');
    return { min: Number(parts[0]), max: Number(parts[1]) };
  })
  .sort((a, b) => a.min - b.min);
  
  const reduced = [ranges[0]];
  
  for (let i = 1; i < ranges.length; i++) {
    const range = ranges[i];
    const last = reduced[reduced.length - 1];
    
    if (range.min <= last.max + 1) {
      console.log(`Min: ${range.min} is less than Last: ${last.max}, so extend it.`);
      last.max = Math.max(last.max, range.max);
    } else {
      console.log(`[${range.min},${range.max}] not in range. Add it.`)
      reduced.push(range);
    }
  }
  
  let total = 0;
  for (const range of reduced) {
    total += range.max - range.min + 1;
  }
  
  console.log(total);
})();
