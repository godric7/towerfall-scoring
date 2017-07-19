// @flow

/*flow-include
  import type { Game } from './index.js';
*/

const mockRankings = { p1: 1, p2: 2, p3: 3, p4: 4 };

const game /*: Game */ = {
  rankings: mockRankings,
  date: "mockDate"
};

function mockGame(obj /*: any */) /*: Game */ {
  return Object.assign({}, game, obj);
}

module.exports = {
  mockRankings,
  mockGame
};
