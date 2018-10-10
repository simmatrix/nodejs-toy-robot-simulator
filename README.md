# NodeJS CLI Toy Robot Simulator

## Description

This is a NodeJS command-line application. The Node version used to develop this is v10.11.0.

## Demo Video Link

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
