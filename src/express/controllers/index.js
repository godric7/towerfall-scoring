// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
*/

const indexCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();
  const { ratings } = state;

  const players = Object.keys(ratings);
  const scores = players
    .map((player) => ({ player, rating: ratings[player] }))
    .sort((a, b) => b.rating - a.rating)
    .map((a, index) => ({
      player: a.player,
      index: index + 1,
      rating: Math.round(a.rating / 100),
    }));
  res.render('index.hbs', { scores });
};

module.exports = {
  indexCtrl,
};
