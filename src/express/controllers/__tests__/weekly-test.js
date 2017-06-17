// @flow

const { mockRankings } = require('../../../types/mocks.js');
const { makeGameFromRankings } = require('../../../types');

const {
  isGameAfterDate
} = require('../weekly.js');

describe('index-test.js', () => {
  describe('isGameAfterDate()', () => {
    it('returns true if the game is after the date', () => {
      const game = makeGameFromRankings(mockRankings);

      const date = new Date();
      date.setDate(date.getDate() - 1);

      expect(isGameAfterDate(date)(game)).toBe(true);
    });

    it('returns false if the game is before the date', () => {
      const game = makeGameFromRankings(mockRankings);

      const date = new Date();
      date.setDate(date.getDate() + 1);

      expect(isGameAfterDate(date)(game)).toBe(false);
    });
  });
});