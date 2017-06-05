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

  let inputs = [1,2,3,4]
    .map((i) => ({ player: '', ranking: i }));

  if (req.body && req.body.inputs && Array.isArray(req.body.inputs)) {
    inputs = req.body.inputs;
    const rankings = {};
    req.body.inputs.forEach((input) => {
      rankings[input.player] = input.ranking;
    });
    const game = makeGame(rankings);
    if (Object.keys(game.rankings).length >= 2) {
      store.dispatch(registerGame(game));
      return res.redirect('/');
    }
  }
  res.render('add-game.hbs', { inputs });
};

module.exports = {
  addGameCtrl,
};
