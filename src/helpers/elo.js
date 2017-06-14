// @flow

const {
  getRatingUpdateFromResult,
  getResultFromRating,
  getResultFromRanking,
} = require('../lib/elo.js');

/*flow-include
  import type { ELORating, ELOResult } from '../lib/elo.js';
  import type { Player, Ranking } from '../types';
*/

function getUpdatedRatingFromRankings(
  prevRatings /*: { [Player]: ELORating } */,
  rankings /*: { [Player]: Ranking } */,
  k /*: number */ = 12
) /*: { [Player]: ELORating } */ {
  const players = Object.keys(rankings);
  if (players.length < 2)
    return prevRatings;

  const tmpRatings = {};
  players.forEach((player) => {
    tmpRatings[player] = prevRatings[player] || 10000;
  });

  const newRatings = {};
  players.forEach((player) => {
    newRatings[player] =
      players.map((opponent) => getRatingUpdateFromResult(
        getResultFromRating(tmpRatings[player], tmpRatings[opponent]),
        getResultFromRanking(rankings[player], rankings[opponent]),
        k / (players.length - 1)
      ))
      .reduce((total, current) => {
        return total + current;
      }, tmpRatings[player]);
  });
  return Object.assign({}, prevRatings, newRatings);
}

module.exports = {
  getUpdatedRatingFromRankings,
};
