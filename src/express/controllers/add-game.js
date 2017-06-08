// @flow

const { makeGame, registerGame } = require('../../redux/actions.js');

/*flow-include
import type { Request, Response } from 'express';
import type { State, Player } from '../../redux/store.js';
import type { ELORating } from '../../lib/elo.js'
import type { Config } from '../../../config.js';

export type GameInput = {| player: string, ranking: number |};
*/

const addGameCtrl = (req /*: Request */, res /*: Response */) => {
  const config /*: Config */ = req.app.get('config');
  const store = req.app.get('store');
  const state /*: State */ = store.getState();

  let inputs /*: Array<GameInput> */ = [1,2,3,4]
    .map((i) => ({ player: '', ranking: i }));
  const players = Object.keys(state.ratings)
    .sort();
  if (req.body && Array.isArray(req.body.inputs))
    inputs = req.body.inputs;

  if (req.body && req.body.password == config.PASSWORD) {
    const rankings = {};
    inputs.forEach((input) => {
      rankings[input.player] = input.ranking;
    });
    const game = makeGame(rankings);
    if (Object.keys(game.rankings).length >= 2) {
      store.dispatch(registerGame(game));
      return res.redirect('/');
    }
  }
  res.render('add-game.hbs', { inputs, players });
};

module.exports = {
  addGameCtrl,
};
