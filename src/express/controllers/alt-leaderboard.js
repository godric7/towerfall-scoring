// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
*/

const altLeaderBoardCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();
  const { games } = state;

  const countAllGamesPerPlayer = [].concat.apply([],
    games
    .map(game => game.rankings)
    .map(game => Object.keys(game))
  ).reduce(reduceCount, {});

  const firstRankPerPlayer = games
    .map(game => game.rankings)
    .map(game => Object.keys(game).find(key => game[key] == 1))
    .reduce(reduceCount, {});

  const scores = Object.keys(countAllGamesPerPlayer)
    .map(player => ({player, rating: (firstRankPerPlayer[player] / countAllGamesPerPlayer[player]) || 0}))
    .sort((a, b) => b.rating - a.rating)
    .map((a, index) => ({
        player: a.player,
        index: index + 1,
        rating: Math.round(a.rating * 10000) / 100,
      }));

  res.render('index.hbs', { scores });
};

const reduceCount = (mergeObject /*: Object */, key /*: String */) => {
  const oldValue = mergeObject[key];

  if (oldValue == undefined) {
    mergeObject[key] = 1;
  } else {
    mergeObject[key] = oldValue + 1;
  }
  return mergeObject
};

module.exports = {
  altLeaderBoardCtrl,
};
