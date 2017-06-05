// @flow

const {
  cleanPlayer,
  cleanRanking,
  makeGame,
} = require('../actions.js');

describe('actions', () => {
  describe('cleanPlayer()', () => {
    it('should return a player string normed to [_-A-Z0-9]', () => {
      expect(cleanPlayer('HELL-O_40')).toEqual('HELL-O_40');
      expect(cleanPlayer('hell-o_41')).toEqual('HELL-O_41');
      expect(cleanPlayer('h/e/l(l)-o _ 4|2|')).toEqual('HELL-O_42');
    });
    it('should handle bad input', () => {
      // $FlowIgnore
      expect(cleanPlayer(42)).toEqual('42');
      // $FlowIgnore
      expect(cleanPlayer(null)).toEqual('NULL');
      // $FlowIgnore
      expect(cleanPlayer(undefined)).toEqual('UNDEFINED');
    });
  });

  describe('cleanRanking()', () => {
    it('should return a ranking number in range [0, Infinity]', () => {
      expect(cleanRanking(42)).toEqual(42);
      expect(cleanRanking(-42)).toEqual(0);
    });

    it('should handle bad input', () => {
      // $FlowIgnore
      expect(cleanRanking('42')).toEqual(42);
      // $FlowIgnore
      expect(cleanRanking('test')).toEqual(0);
      // $FlowIgnore
      expect(cleanRanking(null)).toEqual(0);
    })
  });

  describe('makeGame', () => {
    it('should make a game that reflects rankings', () => {
      const rankings = { P1: 1000, P2: 1000 };
      const game = makeGame(rankings);
      expect(game.rankings).toEqual({ P1: 1000, P2: 1000 });
    });

    it('should normalise players and rankings', () => {
      // $FlowIgnore
      const rankings = { 'h/e/l(l)-o _ 4|2|': 1, 'HELL-O_42': 2, 'p2': '3', 'p3': null };
      const game = makeGame(rankings);
      expect(game.rankings).toEqual({ 'HELL-O_42': 2, P2: 3, P3: 0 });
    });
  });
});


