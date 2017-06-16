// @flow

/*flow-include
  export type Player = string;
  export type Ranking = number;
  export type Rating = number;

  export type Game = {|
    +rankings: { [Player]: Ranking },
    +date: string,
  |};
*/

function makeGameFromRankings(
  rawRankings /*: { [Player]: Ranking } */,
  date /*: string */ = (new Date()).toISOString()
) /*: Game */ {
  const cleanPlayer = (str /*: string */) /*: Player */ =>
    `${str}`.replace(/[^-_a-z0-9]/gi, '').toUpperCase();
  const cleanRanking = (num /*: number */) /*: Ranking */ =>
    Math.max(0, parseInt(num) || 0);

  const _rankings /*: any */ = {};
  Object.keys(rawRankings).forEach((rawPlayer) => {
    _rankings[cleanPlayer(rawPlayer)] =
      cleanRanking(rawRankings[rawPlayer]);
  });
  _rankings[''] && delete(_rankings['']);

  const rankings /*: {| [Player]: Ranking |} */ = _rankings;
  return { rankings, date };
}

module.exports = {
  makeGameFromRankings,
}
