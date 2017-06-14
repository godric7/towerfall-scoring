// @flow

const {
  playerSerializer
} = require('../player.js');

const {
  mockGame,
} = require('../../../types/mocks.js');

describe('player-test.js', () => {
  describe('playerSerializer()', () => {
    it('return expected results', () => {
      const mockGames = [
        mockGame({ rankings: { p1: 1, p2: 2, p3: 3 }, date: '1990-01-01' }),
        mockGame({ rankings: { p2: 1, p3: 2, p4: 3 }, date: '1990-01-02' }),
        mockGame({ rankings: { p4: 1, p2: 2, p1: 3 }, date: '1990-01-03' }),
      ];
      const results = playerSerializer('p1', mockGames, '1990-01-04');
      expect(results).toEqual({
        defeats: [
          { count: 1, opponent: 'p4', ratio: '1.0' },
          { count: 1, opponent: 'p2', ratio: '0.5' },
          { count: 0, opponent: 'p3', ratio: '0.0' },
        ],
        hours: [
          { count: -24, opponent: 'p2' },
          { count: -24, opponent: 'p4' },
          { count: -72, opponent: 'p3' },
        ],
        loss_streaks: [
          { count: 1, opponent: 'p2' },
          { count: 1, opponent: 'p4' },
          { count: 0, opponent: 'p3' },
        ],
        ties: [
          { count: 0, opponent: 'p2', ratio: '0.0' },
          { count: 0, opponent: 'p3', ratio: '0.0' },
          { count: 0, opponent: 'p4', ratio: '0.0' },
        ],
        total: 2,
        victories: [
          { count: 1, opponent: 'p3', ratio: '1.0' },
          { count: 1, opponent: 'p2', ratio: '0.5' },
          { count: 0, opponent: 'p4', ratio: '0.0' },
        ],
        win_streaks: [
          { count: 1, opponent: 'p3' },
          { count: 0, opponent: 'p2' },
          { count: 0, opponent: 'p4' },
        ],
      });
    });
  });
});