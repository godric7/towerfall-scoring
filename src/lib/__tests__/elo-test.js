// @flow

const {
  getResultFromRanking,
  getResultFromRating,
  getRatingUpdateFromResult,
} = require('../elo.js');

describe('ELO', () => {
  describe('getResultFromRanking()', () => {
    it('should return the ELO results described in spec', () => {
      expect(getResultFromRanking(0, 1)).toEqual(100);
      expect(getResultFromRanking(1, 1)).toEqual(50);
      expect(getResultFromRanking(1, 0)).toEqual(0);
    });

    it('should return the ELO results expected on other cases', () => {
      expect(getResultFromRanking(3, 16)).toEqual(100);
      expect(getResultFromRanking(100, 100)).toEqual(50);
      expect(getResultFromRanking(42, 16)).toEqual(0);
    })
  });

  describe('getResultFromRating()', () => {
    it('should return the ELO results described in wikipedia', () => {
      expect(getResultFromRating(30000, 20000)).toEqual(64);
      expect(getResultFromRating(40000, 20000)).toEqual(76);
      expect(getResultFromRating(10000, 10000)).toEqual(50);
      expect(getResultFromRating(20000, 30000)).toEqual(36);
      expect(getResultFromRating(20000, 40000)).toEqual(24);
    });
  });

  describe('getRatingUpdateFromResult()', () => {
    it('should return the ELO updates described in spec with default k factor', () => {
      expect(getRatingUpdateFromResult(50, 50)).toEqual(0);
      expect(getRatingUpdateFromResult(50, 75)).toEqual(250);
      expect(getRatingUpdateFromResult(75, 50)).toEqual(-250);
      expect(getRatingUpdateFromResult(0, 100)).toEqual(1000);
      expect(getRatingUpdateFromResult(100, 0)).toEqual(-1000);
    });

    it('should return the ELO updates described in spec with another k factor', () => {
      expect(getRatingUpdateFromResult(50, 50, 25)).toEqual(0);
      expect(getRatingUpdateFromResult(50, 75, 25)).toEqual(625);
      expect(getRatingUpdateFromResult(75, 50, 25)).toEqual(-625);
      expect(getRatingUpdateFromResult(0, 100, 25)).toEqual(2500);
      expect(getRatingUpdateFromResult(100, 0, 25)).toEqual(-2500);
    });
  });

})