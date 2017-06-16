// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
import type { Game } from '../../types';
*/

const { computeRatingsFromRankings } = require('../../helpers/elo.js');
const { createLeaderboardFromRatings } = require('./index.js');

const weeklyCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();
  const { games } = state;

  const oneWeekAgo = buildOneWeekAgoDate();

  const rankings = games
    .filter(isGameAfterDate(oneWeekAgo))
    .map((game) => game.rankings);
  const ratings = computeRatingsFromRankings(rankings);

  const scores = createLeaderboardFromRatings(ratings);
  res.render('index.hbs', { scores });
};

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
  buildOneWeekAgoDate,
  isGameAfterDate,
  weeklyCtrl,
};
