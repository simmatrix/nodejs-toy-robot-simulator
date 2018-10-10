const expect = require('expect');
const directions = require('./directions.js');

before(() => {
  process.env.NODE_ENV = 'test';
});

it('should be able to check if a coordinate is valid (within the table) or invalid (potentially fall off from the table)', () => {
  let wrongCoordinate = [2, 5];
  expect(directions.isValidCoordinate(wrongCoordinate)).toBeFalsy();
});

it('should not be accepting invalid direction (should not have values other than N, S, E, W)', () => {
  let invalidDirectionCode = 'T';
  expect(directions.isValidDirection(invalidDirectionCode)).toBeFalsy();
});

it('should be getting the correct direction full name (North, South, East, West) given a short code (N, S, E, W', () => {
  let directionCode = 'N';
  expect(directions.getDirectionName(directionCode)).toBe('NORTH');
});
