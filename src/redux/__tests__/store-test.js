// @flow

const {
  reducer,
} = require('../store.js');

const {
  makeGame,
  registerGame,
} = require('../actions.js');

describe('redux', () => {
  describe('reducer() REGISTER_GAME', () => {
    it('should register the new ratings', () => {
      const game = makeGame({  P1: 1, P2: 1 });
      const state = reducer(undefined, registerGame(game));
      expect(state).toEqual({
        games: [game],
        ratings: { P1: 10000, P2: 10000 }
      });
    });

    it('should merge new players', () => {
      const game1 = makeGame({ P1: 1, p2: 1});
      const game2 = makeGame({ P1: 1, p3: 1});
      const state1 = reducer(undefined, registerGame(game1));
      const state2 = reducer(state1, registerGame(game2));
      expect(state2).toEqual({
        games: [game1, game2],
        ratings: { P1: 10000, P2: 10000, P3: 10000 },
      });
    });

    it('should update ratings based on ranking', () => {
      const game1 = makeGame({ P1: 1, P2: 1});
      const game2 = makeGame({ P1: 1, P2: 2});
      const state1 = reducer(undefined, registerGame(game1));
      const state2 = reducer(state1, registerGame(game2));
      expect(state2).toEqual({
        games: [game1, game2],
        ratings: { P1: 10500, P2: 9500 }
      });
    });

  });
});