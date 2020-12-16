# NodeJS CLI Toy Robot Simulator

### This is an old repo. Please refer to the new refactored [Toy Robot Simulator - Updated 2020](https://github.com/simmatrix/nodejs-toy-robot-simulator-2020)

![Toy Robot Screenshot](https://raw.githubusercontent.com/simmatrix/nodejs-toy-robot-simulator/master/toy-robot-screenshot.png)

This is a NodeJS command-line application. The Node version used to develop this is v10.11.0. You may refer to the full problem statement over [here](https://github.com/simmatrix/nodejs-toy-robot-simulator/blob/master/PROBLEM.md)

## Demo Video Link

Please view the demo video from this [link](https://drive.google.com/file/d/1S64ey8-CSc-flPJMy1KGvDb8JnXAfuiJ/view?usp=sharing)

## Constraint

Assuming that we would only have 5x5 units of "table" for the toy robot to roam about freely, without falling off.

![Table for Toy Robot](https://raw.githubusercontent.com/simmatrix/nodejs-toy-robot-simulator/master/toy-robot-grid.png)

## Installation

1. Install globally by running `npm install -g`
2. Execute the command `toy-robot`

## Running it from source

1. Install dependencies by running `yarn install`
2. Start the program by running `yarn start`

## Different Cases Handled

- When user go through the normal flow
- When user keys in an invalid 1st command (that should be a PLACE command)
- When user keys in an invalid coordinate
- When user keys in an invalid direction
- When user keys in an invalid commands (input other than PLACE, MOVE, LEFT, RIGHT, REPORT)
- When the toy robot had moved to an invalid coordinate (changes will be discarded)

## Test

You may check on the test by running `yarn test`

![Toy Robot Test](https://raw.githubusercontent.com/simmatrix/nodejs-toy-robot-simulator/master/toy-robot-test.png)
