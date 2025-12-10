import { fetchInput } from '../fetch';

(async () => {
  // const input = await fetchInput(
  //   '2025',
  //   5,
  //   '53616c7465645f5fb1d44b5620f51effa8eeb723c29637e2b42e96f0518bb450a47b32ab866f1379afe0f8a9c38364c6ca9f620fecf5c7edc28a557249eea61a'
  // );
  const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

  const [rangeString, idString] = input.split('\n\n');
  
  const ranges = rangeString.split('\n').map((range: string) => {
    const parts = range.split('-');
    return { min: Number(parts[0]), max: Number(parts[1]) };
  });
  
  const trimmedRanges: typeof ranges = [];
  let updated = true;
  
  while (updated) {
    updated = false;
    
    for (const range of ranges) {
      let skip = false;
    
      for (const trimmed of trimmedRanges) {
        if (trimmed.min <= range.min && range.max <= trimmed.max) {
          console.log("Subset: ", range, trimmed);
          skip = true;
          break;
        }
      
        if (trimmed.min <= range.min && range.min <= trimmed.max && range.max >= trimmed.max) {
          console.log("Expand right: ", range, trimmed);
          trimmed.max = range.max;
          skip = true;
          break;
        }
      
        if (trimmed.min <= range.max && range.max <= trimmed.max && range.min <= trimmed.min) {
          console.log("Expand left: ", range, trimmed);
          trimmed.min = range.min;
          skip = true;
          break;
        }
      }
    
    
      if (!skip) {
        trimmedRanges.push(range);
      }
      console.log(trimmedRanges);
    }
  }
  
  console.log(trimmedRanges);
})();
