const notification = require('./notification.js');

/**
 * To get the long-form of direction, given the short-form name
 *
 * @param {string} shortCode - The short form of direction (North/South/East/West)
 */
const getDirectionName = shortCode => {
  switch (shortCode) {
    case 'N':
      return 'NORTH';
    case 'S':
      return 'SOUTH';
    case 'E':
      return 'EAST';
    case 'W':
      return 'WEST';
  }
};

/**
 * To get the current direction based on the given command
 *
 * @param {string} currentDirection - The current direction of the toy robot
 * @param {string} command - The command that is being keyed in by user
 */
const getNewDirection = (currentDirection, command) => {
  const directions = ['N', 'E', 'S', 'W'];
  let currentDirectionIndex = directions.indexOf(currentDirection);

  switch (command) {
    case 'LEFT':
      currentDirectionIndex--;
      break;
    case 'RIGHT':
      currentDirectionIndex++;
      break;
  }

  if (currentDirectionIndex < 0) return 'W';
  if (currentDirectionIndex > 3) return 'N';

  return directions[currentDirectionIndex];
};

/**
 * To get a new coordinate after moving one unit towards the direction that the toy robot is facing
 *
 * @param {array} currentCoordinate - The current X & Y coordinate of the toy robot
 * @param {string} currentDirection - The current direction that the toy robot is facing
 */
const getNewCoordinate = (currentCoordinate, currentDirection) => {
  switch (currentDirection) {
    case 'N':
      currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) + 1).toString());
      return currentCoordinate;
    case 'S':
      currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) - 1).toString());
      return currentCoordinate;
    case 'W':
      currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) - 1).toString());
      return currentCoordinate;
    case 'E':
      currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) + 1).toString());
      return currentCoordinate;
  }
};

/**
 * To check if a given coordinate is a valid one and won't cause the toy robot to fall off from the table
 *
 * @param {array} coordinate - The X & Y coordinate of the toy robot
 */
const isValidCoordinate = coordinate => {
  const testX = parseInt(coordinate[0]) >= 0 && parseInt(coordinate[0]) < 5;
  const testY = parseInt(coordinate[1]) >= 0 && parseInt(coordinate[1]) < 5;
  if ((!testX || !testY) && process.env.NODE_ENV !== 'test') {
    notification.error(`You cannot place at the coordinate of [${coordinate[0]},${coordinate[1]}] as it will make your robot falls off, please change direction or key in another coordinate`);
  }
  return testX && testY;
};

/**
 * To check if user key in an invalid input, which is text other than N/S/E/W
 *
 * @param {string} direction The direction (N/S/E/W) that the toy robot is facing
 */
const isValidDirection = direction => {
  const result = ['N', 'S', 'E', 'W'].indexOf(direction) !== -1;
  if (!result && process.env.NODE_ENV !== 'test') {
    notification.error(`Please key in one of the valid directions: N, S, E, W`);
  }
  return result;
};

module.exports = { getDirectionName, getNewDirection, getNewCoordinate, isValidCoordinate, isValidDirection };
