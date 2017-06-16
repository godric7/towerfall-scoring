// @flow


/*flow-include
  import type { Game } from './index.js';
*/

const defaultGame /*: Game */ = {
  rankings: ({ 'p1': 1, 'p2': 2, 'p3': 3, 'p4': 4 } /*: any */),
  date: 'gameDate',
};

function mockGame(obj /*: any */) /*: Game */ {
  return Object.assign({}, defaultGame, obj);
}

module.exports = {
  mockGame
}
