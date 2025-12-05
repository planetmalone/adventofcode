import { fetchInput } from '../fetch';

(async () => {
  const input = await fetchInput(
    '2025',
    2,
    '53616c7465645f5fb1d44b5620f51effa8eeb723c29637e2b42e96f0518bb450a47b32ab866f1379afe0f8a9c38364c6ca9f620fecf5c7edc28a557249eea61a'
  );
  // const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

  const ranges = input.split(',').filter(Boolean).map(range => {
    const ends = range.split('-');
    return {
      min: Number(ends[0]),
      max: Number(ends[1]),
    };
  });
  
  let total = 0;
  
  for (const range of ranges) {
    for (let i = range.min; i <= range.max; i++) {
      const id = String(i);
      
      for (let j = 1; j <= Math.floor(id.length / 2); j++) {
        const segment = id.slice(0, j);
        const trimmed = id.replace(new RegExp(segment, 'g'), '').trim();
        if (trimmed.length === 0) {
          total += i;
          break;
        }
      }
    }
  }
  console.log(total);
})();
