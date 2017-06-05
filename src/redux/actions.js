// @flow

/*flow-include
  import type { Action, Game, Player, Ranking } from './store.js';
*/

function cleanPlayer(str /*: string */) /*: Player */ {
  return `${str}`.replace(/[^-_a-z0-9]/gi, '').toUpperCase();
}

function cleanRanking(num /*: number */) /*: Ranking */ {
  return Math.max(0, parseInt(num) || 0);
}

function makeGame(
  rawRankings /*: { [Player]: Ranking } */
) /*: Game */ {
  const rankings = {};
  const date = (new Date()).toISOString();

  Object.keys(rawRankings).forEach((rawPlayer) => {
    rankings[cleanPlayer(rawPlayer)] =
      cleanRanking(rawRankings[rawPlayer]);
  });
  rankings[''] && delete(rankings['']);
  return { rankings, date };
}

function registerGame(
  game /*: Game */
) /*: Action */ {
  return { type: 'REGISTER_GAME', game };
}

module.exports = {
  cleanPlayer,
  cleanRanking,
  makeGame,
  registerGame
};
