// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
import type { Game, Player } from '../../types';

type Score = {| player: Player, index: number, rating: number |};
*/

const altLeaderBoardCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get("store");
  const state /*: State */ = store.getState();
  const games /*: Array<Game> */ = state.games;

  const countAllGamesPerPlayer /*: { [Player]: number } */ = [].concat
    .apply(
      [],
      games.map(game => game.rankings).map(rankings => Object.keys(rankings))
    )
    .reduce(reduceCount, {});

  const firstRankPerPlayer /*: { [Player]: number } */ = games
    .map(game => game.rankings)
    .map(rankings =>
      Object.keys(rankings).find(player => rankings[player] == 1)
    )
    .reduce(reduceCount, {});

  const scores /*: Array<Score> */ = Object.keys(countAllGamesPerPlayer)
    .map(player => ({
      player,
      rating: firstRankPerPlayer[player] / countAllGamesPerPlayer[player] || 0
    }))
    .sort((a, b) => b.rating - a.rating)
    .map((a, index) => ({
      player: a.player,
      index: index + 1,
      rating: Math.round(a.rating * 10000) / 100
    }));

  res.render("index.hbs", { scores });
};

const reduceCount = (mergeObject /*: any */, key /*: ?Player */) => {
  const oldValue = mergeObject[key];

  if (oldValue == undefined) {
    mergeObject[key] = 1;
  } else {
    mergeObject[key] = oldValue + 1;
  }
  return mergeObject;
};

module.exports = {
  altLeaderBoardCtrl
};
