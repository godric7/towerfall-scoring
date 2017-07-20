// @flow

const { registerGame } = require("../../redux/actions.js");
const { makeGameFromRankings } = require("../../types");

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
import type { ELORating } from '../../lib/elo.js'
import type { Config } from '../../../config.js';

export type GameInput = {| 
  player: string, 
  ranking: number 
|};
*/

const addGameCtrl = (req /*: Request */, res /*: Response */) => {
  const config /*: Config */ = req.app.get("config");
  const store = req.app.get("store");
  const state /*: State */ = store.getState();
  const positions = [1, 2, 3, 4];

  let inputs /*: Array<GameInput> */ = positions.map(i => ({
    player: "",
    ranking: i
  }));

  if (req.body && Array.isArray(req.body.inputs)) inputs = req.body.inputs;

  if (req.body && req.body.password == config.PASSWORD) {
    const rankings = {};
    inputs.forEach(input => {
      rankings[input.player] = input.ranking;
    });
    const game = makeGameFromRankings(rankings);
    if (Object.keys(game.rankings).length >= 2) {
      store.dispatch(registerGame(game));
      return res.redirect("/");
    }
  }
  res.render("add-game.hbs", { inputs, players, positions });
};

module.exports = {
  addGameCtrl
};
