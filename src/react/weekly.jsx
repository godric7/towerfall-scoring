// @noflow
const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");
const { Link } = require("react-router-dom");

/*flow-include
import type { Game } from '../types';
*/

const { computeRatingsFromRankings } = require("../helpers/elo.js");
const { isGameAfterDate } = require("../helpers/date.js");

function createLeaderboardFromRatings(
  ratings /*: { [Player]: ELORating } */
) /*: Array<LeaderboardEntry> */ {
  const players = Object.keys(ratings);
  return players
    .map(player => ({ player, rating: ratings[player] }))
    .sort((a, b) => b.rating - a.rating)
    .map((a, index) => ({
      player: a.player,
      index: index + 1,
      rating: a.rating,
    }));
}

class Weekly extends React.Component {
  render() {
    const { date, games } = this.props;
    const rankings = games
      .filter(isGameAfterDate(new Date(date)))
      .map(game => game.rankings);
    console.log('>', this.props);

    const ratings = computeRatingsFromRankings(rankings);
    const charts = createLeaderboardFromRatings(ratings);
    return (
      <table className="textCenter textBig">
        <tbody>
          {charts.map((chart, index) =>
            <tr key={chart.player}>
              <td>
                <span>
                  {index + 1}
                </span>
              </td>
              <td>
                <Link to={`/players/${chart.player}`}>
                  {chart.player}
                </Link>
              </td>
              <td>
                <span>
                  {Math.round(chart.rating / 100)}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return { games: state.games };
}

function mapDispatchToProps(dispatch) {
  return {};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Weekly);
