import fetch from 'node-fetch';

(async () => {
  let data = await fetch(
    'https://adventofcode.com/2020/day/8/input',
    {
      headers: {
        cookie: 'session=53616c7465645f5faa4c6623c95667fe5eb6aa8f9587bfdd3bbafd16cbd93aea84b8602f6b042262ef2913c441d513b0'
      }
    }
  )
    .then(response => response.text())
    .then(response => response.split('\n'))
    .then(response => response.filter(Boolean))
    .then(response => response.map(instruction => {
      const [command, value] = instruction.split(' ')
      return {
        command,
        value: parseInt(value)
      };
    }));

  let total = 0;

  for (let instructionIndex = 0; instructionIndex < data.length; instructionIndex++) {
    total = 0;
    const outerInstruction = data[instructionIndex];
    const originalCommand = outerInstruction.command;
    if (outerInstruction.command === 'nop') {
      outerInstruction.command === 'jmp'
    } else if (outerInstruction.command === 'jmp') {
      outerInstruction.command = 'nop'
    }

    let current = 0;
    let foundLoop = false;
    const instructions = new Set();
    while(!foundLoop && current < data.length) {
      if (instructions.has(current)) {
        foundLoop = true;
      } else {
        instructions.add(current);
        const instruction = data[current];
        switch(instruction.command) {
          case 'acc':
            total += instruction.value;
            current++;
            console.log({ acc: instruction.value });
            break;
          case 'jmp':
            current += instruction.value;
            break;
          case 'nop':
          default:
            current++;
        }
      }
    }

    if (!foundLoop) {
      break;
    }
    outerInstruction.command = originalCommand;
  }

  console.log(total);
})();