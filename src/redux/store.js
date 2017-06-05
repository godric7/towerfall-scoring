// @flow

const {
  createStore: reduxCreateStore,
  applyMiddleware,
} = require('redux');

const {
  getUpdatedRatingFromRankings,
} = require('../helpers/elo.js');

const {
  replayMiddleware,
} = require('../lib/redux-replay.js');

const thunk = require('redux-thunk').default;

/*flow-include
  import type { ELORating, ELOResult } from '../lib/elo.js';
  import type { Dispatch, GetState, Store as ReduxStore, Next } from 'redux';

  export type Player = string;
  export type Ranking = number;
  export type Rating = number;

  export type Game = {|
    rankings: { [Player]: Ranking },
    date: string,
  |}

  export type State = {|
    games: Array<Game>,
    ratings: { [Player]: ELORating },
  |}

  export type Store = ReduxStore<State>;

  export type Action =
    | {| type: "REGISTER_GAME", game: Game |}

  export type ExtraArgs = {|
  |};

  export type Thunk = (dispatch: Dispatch, getState: GetState) => any;
*/

const defaultState /* State */ = {
  games: [],
  ratings: {},
};

function reducer(
  state /*: State */ = defaultState,
  action /*: Action */
) /*: State */ {
  switch (action.type) {
    case 'REGISTER_GAME': {
      const games = state.games.concat([ action.game ]);
      const ratings = getUpdatedRatingFromRankings(
        state.ratings, action.game.rankings
      );
      return { games, ratings };
    }
    default: {
      return state;
    }
  }
}

function createStore(
  writeFunc /*: (string) => void */,
  extraArgs /*: ExtraArgs */
) /*: Store */ {
  const thunkMiddleware = thunk.withExtraArgument(extraArgs);
  return reduxCreateStore(reducer, applyMiddleware(
    replayMiddleware(writeFunc),
    thunkMiddleware
  ));
}

module.exports = {
  reducer,
  createStore,
};