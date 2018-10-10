#!/usr/bin/env node

const notification = require('./notification.js');
const commands = require('./commands.js');
const explainer = require('./explainer.js');

/**
 * To receive input command from user continuously, until user explicity terminate the program
 */
const readInput = () => {
  let stdin = process.openStdin();
  let coordinate = [0, 0];
  let direction = '';
  let round = 0;

  stdin.addListener('data', function(d) {
    let command = d
      .toString()
      .trim()
      .toUpperCase();

    let isValid = commands.isValidCommand(round, command);

    if (isValid) {
      if (commands.isCommandTypeOf('PLACE', command)) {
        [newCoordinateX, newCoordinateY, newDirection, isValid] = commands.execute(command);

        if (isValid) {
          coordinate[0] = newCoordinateX;
          coordinate[1] = newCoordinateY;
          direction = newDirection;
        }
      } else {
        [coordinate, direction] = commands.execute(command, coordinate, direction);
      }

      if (isValid) {
        round++;
      }
    }
  });
};

/**
 * To initialize this program
 */
const init = () => {
  explainer.printHeader();
  explainer.printDescription();
  readInput();
};

init();
