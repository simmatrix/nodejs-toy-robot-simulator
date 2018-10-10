const expect = require('expect');
const commands = require('./commands.js');

before(() => {
  process.env.NODE_ENV = 'test';
});

it('should not change the initial coordinate and direction if the given command will make the robot fall off the table', () => {
  let command = 'MOVE';
  let initialCoordinate = [0, 0];
  let initialDirection = 'S';

  let result = commands.execute(command, initialCoordinate, initialDirection);
  let newCoordinate = result[0];
  let newDirection = result[1];

  expect(newCoordinate).toEqual(initialCoordinate);
  expect(newDirection).toEqual(initialDirection);
});

it('should be getting the valid command text (PLACE #,#,S, MOVE, LEFT, RIGHT, REPORT)', () => {
  let validCommands = ['PLACE 1,2,N', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
  let invalidCommands = ['HELLO', 'LOREM', 'IPSUM'];

  validCommands.map(validCommand => {
    expect(commands.isInvalidCommandPattern(validCommand)).toBeFalsy();
  });

  invalidCommands.map(invalidCommand => {
    expect(commands.isInvalidCommandPattern(invalidCommand)).toBeTruthy();
  });
});

it('should be receiving a PLACE command for the first round', () => {
  let round = 0;
  let validCommand = 'PLACE 1,2,N';
  let invalidCommand = 'MOVE';

  expect(commands.isInvalidFirstCommandPattern(round, validCommand)).toBeFalsy();
  expect(commands.isInvalidFirstCommandPattern(round, invalidCommand)).toBeTruthy();
});

it('PLACE should be placing the robot at the given location', () => {
  let command = 'PLACE 3,2,N';
  let expectedCoordinateX = 3;
  let expectedCoordinateY = 2;
  let expectedDirection = 'N';
  let expectedValidIndicator = true;
  let result = commands.execute(command);

  let placedCoordinateX = result[0];
  let placedCoordinateY = result[1];
  let placedDirection = result[2];
  let isValid = result[3];

  expect(placedCoordinateX).toEqual(expectedCoordinateX);
  expect(placedCoordinateY).toEqual(expectedCoordinateY);
  expect(placedDirection).toEqual(expectedDirection);
  expect(isValid).toEqual(expectedValidIndicator);
});

it('MOVE should move the toy robot one unit towards the a given direction', () => {
  let command = 'MOVE';
  let initialCoordinate = [0, 0];
  let initialDirection = 'N';
  let expectedCoordinate = [0, 1];
  let expectedDirection = 'N';

  let result = commands.execute(command, initialCoordinate, initialDirection);
  let newCoordinate = result[0];
  let newDirection = result[1];

  expect(newCoordinate).toEqual(expectedCoordinate);
  expect(newDirection).toEqual(expectedDirection);
});

it('LEFT should turn the toy robot to the left side', () => {
  let command = 'LEFT';
  let initialCoordinate = [0, 0];
  let initialDirection = 'N';
  let expectedDirection = 'W';

  let result = commands.execute(command, initialCoordinate, initialDirection);
  let newDirection = result[1];

  expect(newDirection).toEqual(expectedDirection);
});

it('RIGHT should turn the toy robot to the right side', () => {
  let command = 'RIGHT';
  let initialCoordinate = [0, 0];
  let initialDirection = 'N';
  let expectedDirection = 'E';

  let result = commands.execute(command, initialCoordinate, initialDirection);
  let newDirection = result[1];

  expect(newDirection).toEqual(expectedDirection);
});

it('REPORT should be returning the correct output', () => {
  let command = 'REPORT';
  let coordinateX = 1;
  let coordinateY = 2;
  let direction = 'N';
  let expectedOutput = '1,2,NORTH';
  let output = commands.execute(command, [coordinateX, coordinateY], direction);
  expect(output).toEqual(expectedOutput);
});
