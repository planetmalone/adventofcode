import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/10/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean))
    .then(response => response.map(Number))
    .then(response => response.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }))
    .then(response => response.map(createAdapter));

    function createAdapter (rating) {
      rating = Number.parseInt(rating)
      return {
        rating,
        compatability: [
          rating + 1,
          rating + 2,
          rating + 3
        ]
      }
    }

const adapters = data;
adapters.unshift({ rating: 0 })

const permutations = [1, 1, 1, 2, 4, 7, 13]
let sequenceLength = 0
let combinationCount = 1
let maxLength = 0
const jolts = {
  1: 0,
  3: 0
}
adapters.forEach((adapter, index, list) => {
  sequenceLength++
  const next = list[index + 1] || { rating: adapter.rating + 3 }
  if (next) {
    const jolt = next.rating - adapter.rating
    jolts[jolt]++
    if (jolt === 3) {
      combinationCount = combinationCount * permutations[sequenceLength]
      maxLength = Math.max(maxLength, sequenceLength)
      sequenceLength = 0
    }
  }
})

  console.log(combinationCount);
})();