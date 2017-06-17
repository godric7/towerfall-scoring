// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
import type { ELORating } from '../../lib/elo.js';
import type { Player } from '../../types';

type LeaderboardEntry = {|
  player: Player;
  index: number;
  rating: number;
|};
*/

const indexCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();
  const { ratings } = state;
  const scores = createLeaderboardFromRatings(ratings);
  res.render('index.hbs', { scores });
};


function createLeaderboardFromRatings(ratings /*: { [Player]: ELORating } */)/*: Array<LeaderboardEntry> */ {
  const players = Object.keys(ratings);
  return players
    .map((player) => ({ player, rating: ratings[player] }))
    .sort((a, b) => b.rating - a.rating)
    .map((a, index) => ({
      player: a.player,
      index: index + 1,
      rating: Math.round(a.rating / 100),
    }));
}

module.exports = {
  createLeaderboardFromRatings,
  indexCtrl,
};
