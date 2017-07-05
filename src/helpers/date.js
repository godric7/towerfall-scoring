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

function isGameAfterDate(date /*: Date */) {
  return (game/*: Game */) => {
    return new Date(game.date) >= date;
  }
}


module.exports = {
  buildOneDayAgoDate,
  buildOneWeekAgoDate,
  isGameAfterDate,
};
