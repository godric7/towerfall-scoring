// @flow

const { makeGame, registerGame } = require('../../redux/actions.js');

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
*/

const gamesCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();

  const games = state.games
    .sort((g1, g2) => g2.date.localeCompare(g1.date))
    .map((game) => ({
      date: game.date,
      rankings: Object.keys(game.rankings)
        .map((player) => ({ player, rank: game.rankings[player] }))
        .sort((a, b) => a.rank - b.rank),
    }));
  res.render('games.hbs', { games });
};

module.exports = {
  gamesCtrl,
};
