const directions = require('./directions.js');
const notification = require('./notification.js');

/**
 * To check if the command receives on the first round is PLACE X,Y,F
 *
 * @param {int} round - The number indicator for the number of round
 * @param {string} command - The command that is being keyed in by user
 */
const isInvalidFirstCommandPattern = (round, command) => {
  return round === 0 && /PLACE\s\S{5}/.test(command) === false;
};

/**
 * To check if the command receives is a valid based on specified pattern
 *
 * @param {string} command The command that is being keyed in by user
 */
const isInvalidCommandPattern = command => {
  return /PLACE\s\S{5}|MOVE|LEFT|RIGHT|REPORT/.test(command) === false;
};

/**
 * To check if the given command matches with the intended command
 *
 * @param {string} type - The type of command to be verified against
 * @param {string} command - The command that is being keyed in by user
 */
const isCommandTypeOf = (type, command) => {
  switch (type) {
    case 'PLACE':
      return /PLACE\s\S{5}/.test(command);
    default:
      return type === command;
  }
};

/**
 * To check if the command receives is a valid and eligible command
 *
 * @param {int} round - The number indicator for the number of round
 * @param {string} command - The command that is being keyed in by user
 */
const isValidCommand = (round, command) => {
  let isValid = true;

  // Validate user input
  if (isInvalidFirstCommandPattern(round, command)) {
    if (process.env.NODE_ENV !== 'test') {
      notification.error('The first command should be "PLACE <x-coordinate>,<y-coordinate>,<direction>"');
    }
    isValid = false;
  } else if (isInvalidCommandPattern(command)) {
    if (process.env.NODE_ENV !== 'test') {
      notification.error('Please enter a valid command: PLACE, MOVE, LEFT, RIGHT, REPORT');
    }
    isValid = false;
  }

  return isValid;
};

/**
 * To execute the given command (PLACE, MOVE, LEFT, RIGHT, REPORT)
 *
 * @param {string} command - The command that is being keyed in by user
 * @param {array} coordinate - The X and Y coordinates
 * @param {string} direction - The direction, whether it be N (North), S (South), E (East) or W (West)
 */
const execute = (command, coordinate = null, direction = null) => {
  switch (true) {
    case /PLACE\s\S{5}/.test(command):
      let subCommand = command.split(' ')[1]; // The 2nd portion of the command "PLACE xxxxxxx"
      let breakdownSubCommand = subCommand.split(','); // The command for example "PLACE 2,5,W"
      let newXCoordinate = breakdownSubCommand[0];
      let newYCoordinate = breakdownSubCommand[1];
      let newDirection = breakdownSubCommand[2];
      let isValid = directions.isValidCoordinate([newXCoordinate, newYCoordinate]) && directions.isValidDirection(newDirection);

      return [parseInt(newXCoordinate), parseInt(newYCoordinate), newDirection, isValid];
    case command === 'MOVE':
      let tempCoordinate = coordinate.slice(0);
      let computedCoordinate = directions.getNewCoordinate(tempCoordinate, direction);
      let isValidCoordinate = directions.isValidCoordinate(computedCoordinate);
      if (isValidCoordinate) {
        coordinate = computedCoordinate;
      }
      break;
    case command === 'LEFT':
      direction = directions.getNewDirection(direction, command);
      break;
    case command === 'RIGHT':
      direction = directions.getNewDirection(direction, command);
      break;
    case command === 'REPORT':
      let result = coordinate[0] + ',' + coordinate[1] + ',' + directions.getDirectionName(direction);
      if (process.env.NODE_ENV !== 'test') {
        notification.success(`\nCurrent position of the toy robot: ${result}\n`);
        notification.info('You may now resume typing other commands below:\n');
      } else {
        return result;
      }
  }

  return [coordinate, direction];
};

module.exports = { isInvalidFirstCommandPattern, isInvalidCommandPattern, isCommandTypeOf, isValidCommand, execute };
