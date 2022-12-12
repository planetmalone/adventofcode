import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/11/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean))
    .then(response => response.map(row => row.split('')));

  const findAdjacent = (layout, rowIndex, columnIndex) => {
    let ri = -1;
    let ci = -1;
    const adjacent = [];
      // Top
      if (rowIndex === 0) {
        adjacent.push(null, null, null)
      } else {
        // Top Left
        if (columnIndex === 0) {
          adjacent.push(null);
        } else {
          ri = rowIndex;
          ci = columnIndex;
          while(ri > 0 && ci > 0) {
            ri--;
            ci--;
            if (layout[ri][ci] !== '.') {
              adjacent.push(layout[ri][ci]);
              break;
            } else if (ri === 0 || ci === 0) {
              adjacent.push(null);
            }
          }
        }

        // Top
        ri = rowIndex;
        while (ri > 0) {
          ri--;
          if (layout[ri][columnIndex] !== '.') {
            adjacent.push(layout[ri][columnIndex]);
            break;
          } else if (ri === 0) {
            adjacent.push(null);
          }
        }

        // Top Right
        if (columnIndex === layout[rowIndex].length - 1) {
          adjacent.push(null);
        } else {
          ri = rowIndex;
          ci = columnIndex;
          while(ri > 0 && ci < layout[rowIndex].length - 1) {
            ri--;
            ci++;
            if (layout[ri][ci] !== '.') {
              adjacent.push(layout[ri][ci]);
              break;
            } else if (ri === 0 || ci === layout[rowIndex].length - 1) {
              adjacent.push(null);
            }
          }
        }
      }

      // Middle Left
      if (columnIndex === 0) {
        adjacent.push(null);
      } else {
        ci = columnIndex;
        while (ci > 0) {
          ci--;
          if (layout[rowIndex][ci] !== '.') {
            adjacent.push(layout[rowIndex][ci]);
            break;
          } else if (ci === 0) {
            adjacent.push(null);
          }
        }
      }

      // Middle Right
      if (columnIndex === layout[rowIndex].length - 1) {
        adjacent.push(null);
      } else {
        ci = columnIndex;
        while (ci < layout[rowIndex].length - 1) {
          ci++;
          if (layout[rowIndex][ci] !== '.') {
            adjacent.push(layout[rowIndex][ci]);
            break;
          } else if (ci === layout[rowIndex].length - 1) {
            adjacent.push(null);
          }
        }
      }

      // Bottom
      if (rowIndex === layout.length - 1) {
        adjacent.push(null, null, null)
      } else {
        // Bottom Left
        if (columnIndex === 0) {
          adjacent.push(null);
        } else {
          ri = rowIndex;
          ci = columnIndex;
          while(ri < layout.length - 1 && ci > 0) {
            ri++;
            ci--;
            if (layout[ri][ci] !== '.') {
              adjacent.push(layout[ri][ci]);
              break;
            } else if (ri === layout.length - 1 || ci === 0) {
              adjacent.push(null);
            }
          }
        }

        // Bottom
        ri = rowIndex;
        while (ri < layout.length - 1) {
          ri++;
          if (layout[ri][columnIndex] !== '.') {
            adjacent.push(layout[ri][columnIndex]);
            break;
          } else if (ri === layout.length - 1) {
            adjacent.push(null);
          }
        }

        // Botom Right
        if (columnIndex === layout[rowIndex].length - 1) {
          adjacent.push(null);
        } else {
          ri = rowIndex;
          ci = columnIndex;
          while(ri < layout.length - 1 && ci < layout[rowIndex].length - 1) {
            ri++;
            ci++;
            if (layout[ri][ci] !== '.') {
              adjacent.push(layout[ri][ci]);
              break;
            } else if (ri === layout.length - 1 || ci === layout[rowIndex].length - 1) {
              adjacent.push(null);
            }
          }
        }
      }

    return adjacent;
  }

  const updateEmpty = (layout, rowIndex, columnIndex) => {
    const adjacent = findAdjacent(layout, rowIndex, columnIndex);
    const foundOccupied = adjacent.some(spot => spot === '#');
    return foundOccupied ? layout[rowIndex][columnIndex] : '#';
  };

  const updateOccupied = (layout, rowIndex, columnIndex) => {
    const adjacent = findAdjacent(layout, rowIndex, columnIndex);
    const occupied = adjacent.filter(spot => spot === '#');
    return occupied.length >= 5 ? 'L' : layout[rowIndex][columnIndex];
  };

  let updated = true;
  let previousLayout = data.map(arr => arr.slice());
  let currentLayout = [];
  let occupied = 0;
  while (updated) {
    updated = false;
    currentLayout = previousLayout.map(arr => arr.slice());
    occupied = 0;

    previousLayout.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const state = column === 'L' ? 'empty' : (column === '#' ? 'occupied' : 'floor');
        switch(state) {
          case 'empty':
            currentLayout[rowIndex][columnIndex] = updateEmpty(previousLayout, rowIndex, columnIndex);
            break;
          case 'occupied':
            currentLayout[rowIndex][columnIndex] = updateOccupied(previousLayout, rowIndex, columnIndex);
            break;
        }
        if (currentLayout[rowIndex][columnIndex] === '#') {
          occupied++;
        }
        if (currentLayout[rowIndex][columnIndex] !== previousLayout[rowIndex][columnIndex]) {
          updated = true;
        }
      });
    });
    previousLayout = currentLayout;
    console.log('----------');
    console.log(currentLayout.map(row => row.join('')).join('\n'));
  }
  console.log(occupied);
})();