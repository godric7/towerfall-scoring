// @flow

/*flow-include
  import type { Action } from './store.js';
  import type { Game } from '../types';
*/

function registerGame(
  game /*: Game */
) /*: Action */ {
  return { type: 'REGISTER_GAME', game };
}

module.exports = {
  registerGame
};
