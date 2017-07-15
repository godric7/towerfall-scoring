// @flow

const moment = require('moment');

const { mockRankings } = require('../../types/mocks.js');
const { makeGameFromRankings } = require('../../types');

const {
  buildBeginningOfDayDate,
  buildBeginningOfWeekDate,
  isGameAfterDate,
} = require('../date.js');

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

describe('buildBeginningOfDayDate()', () => {
  it('returns the beginning of the day', () => {
    moment.locale('fr');
    const date = new Date(2017, 6, 14, 15, 42) // 14 juillet 2017 15:42
    expect(buildBeginningOfDayDate(date)).toEqual(new Date(2017, 6, 14, 0, 0));
  });
});

describe('buildBeginningOfWeekDate()', () => {
  it('returns monday of the same week', () => {
    moment.locale('fr');
    const date = new Date(2017, 6, 14, 15, 42) // 14 juillet 2017 15:42
    expect(buildBeginningOfWeekDate(date)).toEqual(new Date(2017, 6, 10, 0, 0));
  });
});