const moment = require('moment');

function buildBeginningOfDayDate(date /*: Date */ = new Date()) {
  return moment(date).startOf('day').toDate();
}

function buildBeginningOfWeekDate(date /*: Date */ = new Date()) {
  return moment(date).startOf('week').toDate();
}

function isGameAfterDate(date /*: Date */) {
  return (game/*: Game */) => {
    return new Date(game.date) >= date;
  }
}


module.exports = {
  buildBeginningOfDayDate,
  buildBeginningOfWeekDate,
  isGameAfterDate,
};
