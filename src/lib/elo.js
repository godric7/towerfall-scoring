// @flow

/*flow-include
  export type ELORating = number;
  export type ELOResult = number;
*/

function getResultFromRanking(
  a /*: number */,
  b /*: number */
) /*: ELOResult */ {
  if (a < b)
    return 100;
  else if (a == b)
    return 50;
  else if (a > b)
    return 0;
  return 0;
}

function getResultFromRating(
  a /*: ELORating */,
  b /*: ELORating */
) /*: ELOResult */ {
  return Math.round(
    (1 * 100) /
      (1 + Math.pow(10, (
        (b - a) / (400 * 100)
      )))
  );
}

function getRatingUpdateFromResult(
  expected /*: ELOResult */,
  actual /*: ELOResult */,
  k /*: number */ = 10
) /*: ELORating */ {
  return Math.round((k) * (actual - expected));
}

module.exports = {
  getResultFromRanking,
  getResultFromRating,
  getRatingUpdateFromResult,
};
