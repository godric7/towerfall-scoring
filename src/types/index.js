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
  const cleanPlayer = (str /*: string */) =>
    `${str}`.replace(/[^-_a-z0-9]/gi, '').toUpperCase();
  const cleanRanking = (num /*: number */) =>
    Math.max(0, parseInt(num) || 0);

  const rankings = {};
  Object.keys(rawRankings).forEach((rawPlayer) => {
    rankings[cleanPlayer(rawPlayer)] =
      cleanRanking(rawRankings[rawPlayer]);
  });
  rankings[''] && delete(rankings['']);
  return { rankings, date };
}

module.exports = {
  makeGameFromRankings,
}
