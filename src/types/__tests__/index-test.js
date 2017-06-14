// @flow

const {
  makeGameFromRankings,
} = require('../index.js');

describe('actions', () => {
  describe('makeGameFromRankings', () => {
    it('should make a game that reflects rankings', () => {
      const rankings = { P1: 1000, P2: 1000 };
      const game = makeGameFromRankings(rankings);
      expect(game.rankings).toEqual({ P1: 1000, P2: 1000 });
    });

    it('should normalise rankings', () => {
      // $FlowIgnore
      const rankings = { P1: 1, P2: '2', P3: null };
      const game = makeGameFromRankings(rankings);
      expect(game.rankings).toEqual({ P1: 1, P2: 2, P3: 0 });
    });

    it('should normalise players', () => {
      const rankings = { 'h/e/l(l)-o _ 4|2|': 1, 'HELL-O_42': 2 };
      const game = makeGameFromRankings(rankings);
      expect(game.rankings).toEqual({ 'HELL-O_42': 2 });
    });


    it('should discard void players', () => {
      const rankings = { '': 1, 'P2': 2 };
      const game = makeGameFromRankings(rankings);
      expect(game.rankings).toEqual({ 'P2': 2 });
    });

  });
});


