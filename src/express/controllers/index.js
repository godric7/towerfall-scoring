// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State, Player } from '../../redux/store.js';
import type { ELORating } from '../../lib/elo.js'
export type PlayerRating = [Player, ELORating];
*/

const indexCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();
  const { ratings } = state;

  const players = Object.keys(ratings);
  const scores = players.map((player) => {
    return { player, rating: ratings[player] };
  }).sort((a, b) => b.rating - a.rating);
  res.render('index.hbs', { scores });
};

module.exports = {
  indexCtrl,
};
