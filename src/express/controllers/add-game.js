// @flow

const { makeGame, registerGame } = require('../../redux/actions.js');

/*flow-include
import type { Request, Response } from 'express';
import type { State, Player } from '../../redux/store.js';
import type { ELORating } from '../../lib/elo.js'

export type GameInput = {| player: string, ranking: number |}
*/

const addGameCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();

  if (req.body && req.body.inputs
    && Array.isArray(req.body.inputs)
    && req.body.inputs.length == 4
  ) {
    const rankings = {};
    req.body.inputs
      .filter((input) => input.player != '')
      .forEach((input) => {
        rankings[input.player] = input.ranking;
      });
    const game = makeGame(rankings);
    store.dispatch(registerGame(game));
    return res.redirect('/');
  }
  const inputs = [
    { player: '', ranking: 1 },
    { player: '', ranking: 2 },
    { player: '', ranking: 3 },
    { player: '', ranking: 4 },
  ];
  res.render('add-game.hbs', { inputs });
};

module.exports = {
  addGameCtrl,
};
