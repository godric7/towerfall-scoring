function buildOneDayAgoDate() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);
  return oneWeekAgo;
}

function buildOneWeekAgoDate() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return oneWeekAgo;
}

function buildBeginningOfDayDate() {
  const buildBeginningOfDayDate = new Date();
  buildBeginningOfDayDate.setHours(0, 0 ,0 ,0);
  return buildBeginningOfDayDate;
}

function buildBeginningOfWeekDate() {
  const buildBeginningOfWeekDate = new Date();
  const day = buildBeginningOfWeekDate.getDay()
  const diff = buildBeginningOfWeekDate.getDate() - day + (day == 0 ? -6 : 1);
  buildBeginningOfWeekDate.setDate(buildBeginningOfWeekDate.getDate() - diff);
  buildBeginningOfWeekDate.setHours(0, 0 ,0 ,0);
  return buildBeginningOfWeekDate;
}

function isGameAfterDate(date /*: Date */) {
  return (game/*: Game */) => {
    return new Date(game.date) >= date;
  }
}


module.exports = {
  buildBeginningOfDayDate,
  buildBeginningOfWeekDate,
  buildOneDayAgoDate,
  buildOneWeekAgoDate,
  isGameAfterDate,
};
