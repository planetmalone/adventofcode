import fetch from 'node-fetch';

(async () => {
  const response = await fetch(
      'https://adventofcode.com/2021/day/4/input',
      {
        headers: {
          cookie: 'session=53616c7465645f5f797e36ac9412ba7ae6a0f8a9e2f9b16f9b255d7e76dde07650128d2a311d26f2fd228c6dd0c73698'
        }
      }
  )
      .then(response => response.text());

  const response2 = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

  const input = response.split('\n\n');
  const [numbersString, ...boardStrings] = input;
  const numbersToCall = numbersString.split(',').map(x => parseInt(x, 10));
  const boards = boardStrings.map(board => {
    const values = [];
    const newBoard = {
      bingo: false,
      ...board
          .replace(/  +/g, ' ')
          .split('\n')
          .map(row => {
            const numbers = row.replace(/^ (\d)/g, '$1').split(' ').map(x => parseInt(x, 10));
            const result = {};

            values.push(...numbers);
            numbers.forEach((number, i) => {
              result[i] = {
                value: number,
                marked: false
              };
            });

            return result;
          })
    };

    return { values, ...newBoard };
  })

  let unmarked;
  let calledNumber;

  loop1:
  for (let numIndex = 0; numIndex < numbersToCall.length; numIndex++) {
    const number = numbersToCall[numIndex];

    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex];

      if (board.values.includes(number)) {
        const [row, column] = markNumber(board, number);
        const line = checkBingo(board, row, column);
        if (line) {
          board.bingo = true;

          if (board.last) {
            unmarked = getUnmarked(board);
            calledNumber = number;
            break loop1
          }
        }
      }
    }

    const noBingos = boards.filter(x => !x.bingo);
    if (noBingos.length === 1) {
      noBingos[0].last = true;
    }
  }

  const sum = unmarked.reduce((a, b) => a + b, 0);
  console.log(`Part 1: ${sum} * ${calledNumber} = ${sum * calledNumber}`);

  // Part 2

  function markNumber(board, number) {
    for (const [rowNumber, row] of Object.entries(board)) {
      if (rowNumber !== 'values') {
        for (const [columnNumber, column] of Object.entries(row)) {
          if (column.value === number) {
            column.marked = true;
            return [rowNumber, columnNumber];
          }
        }
      }
    }

    return [null, null];
  }

  function checkBingo (board, row, column) {
    let bingo = false;
    // Check row
    const rowValues = Object.values(board[row]);
    bingo = rowValues.every(x => x.marked);
    if (bingo) {
      return rowValues.map(x => x.value);
    }

    // Check column
    const columns = Object.values(board).map(x => x[column]).filter(x => !!x && typeof x.marked !== 'undefined');
    if (column === '2') {
    }
    if (columns.every(x => x.marked)) {
      return columns.map(x => x.value);
    }

    return null;
  }

  function getUnmarked (board) {
    const result = [];
    for (const [key, row] of Object.entries(board)) {
      if (key !== 'values') {
        const unmarked = Object.values(row).filter(x => !x.marked);
        result.push(...unmarked.map(x => x.value));
      }
    }
    return result;
  }
})();
