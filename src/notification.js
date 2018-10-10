const chalk = require('chalk');

/**
 * To show an informational message to the console
 *
 * @param {string} message - The message to be displayed in the console
 */
const info = async message => {
  console.log(chalk.green(message));
};

/**
 * To show a success message to the console
 *
 * @param {string} message - The message to be displayed in the console
 */
const success = async message => {
  console.log(chalk.black.bgGreen(message));
};

/**
 * To show an error message to the console
 *
 * @param {string} message - The message to be displayed in the console
 */
const error = async message => {
  console.log(chalk.white.bgRed(message));
};

module.exports = { info, success, error };
