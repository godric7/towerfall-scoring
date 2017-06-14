// @flow

const {
  reducer,
} = require('../store.js');

const {
  registerGame,
} = require('../actions.js');

const {
  mockGame
} = require('../../types/mocks.js');

describe('redux', () => {
  describe('reducer() REGISTER_GAME', () => {
    it('should register the new ratings', () => {
      const game = mockGame({ rankings: { P1: 1, P2: 1 } });

      const state = reducer(undefined, registerGame(game));
      expect(state.games)
        .toEqual([game]);
      expect(state.ratings)
        .toEqual({ P1: 10000, P2: 10000 });
    });

    it('should merge new players', () => {
      const game1 = mockGame({ rankings: { P1: 1, P2: 1} });
      const game2 = mockGame({ rankings: { P1: 1, P3: 1} });

      const state1 = reducer(undefined, registerGame(game1));
      const state2 = reducer(state1, registerGame(game2));
      expect(state2.games)
        .toEqual([game1, game2]);
      expect(state2.ratings)
        .toEqual({ P1: 10000, P2: 10000, P3: 10000 });
    });

    it('should update ratings based on ranking', () => {
      const game1 = mockGame({ rankings: { P1: 1, P2: 1} });
      const game2 = mockGame({ rankings: { P1: 1, P2: 2} });

      const state1 = reducer(undefined, registerGame(game1));
      const state2 = reducer(state1, registerGame(game2));
      expect(state2.games)
        .toEqual([game1, game2]);
      expect(state2.ratings)
        .toEqual({ P1: 10600, P2: 9400 });
    });
  });
});