const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");
const { Link } = require("react-router-dom");
const { getResultFromRating } = require("../lib/elo.js");


class Players extends React.Component {

  render() {
    console.log(this.props);
    const { player } = this.props.match.params;
    const { games, ratings } = this.props;
    const time = new Date().getTime();

    const encounters = games
      .sort((a, b) => (b.date < a.date ? 1 : b.date > a.date ? -1 : 0))
      .filter(game => Object.keys(game.rankings).includes(player))
      .reduce((acc, game) => {
        const last_date = game.date;
        Object.keys(game.rankings).forEach(opponent => {
          acc[opponent] = acc[opponent] || {
            opponent,
            victories: 0,
            defeats: 0,
            hours: 0,
            winStreak: 0,
            lossStreak: 0,
            total: 0
          };
          if (game.rankings[opponent] > game.rankings[player]) {
            acc[opponent].victories += 1;
            acc[opponent].winStreak += 1;
            acc[opponent].lossStreak = 0;
          } else if (game.rankings[opponent] == game.rankings[player]) {
            acc[opponent].winStreak = 0;
            acc[opponent].lossStreak = 0;
          } else if (game.rankings[opponent] < game.rankings[player]) {
            acc[opponent].defeats += 1;
            acc[opponent].winStreak = 0;
            acc[opponent].lossStreak += 1;
          }
          const last = new Date(game.date).getTime();
          acc[opponent].hours = Math.round((last - time) / (1000 * 60 * 60));
          acc[opponent].total += 1;
        });
        return acc;
      }, {});

    const total = encounters[player].total;
    delete encounters[player];

    const results = Object.keys(encounters)
      .map(opponent => {
        return Object.assign({}, encounters[opponent], {
          elo: (getResultFromRating(ratings[player], ratings[opponent]) /
            100).toFixed(1),
          ratio: (encounters[opponent].victories /
            encounters[opponent].total).toFixed(1)
        });
      })
      .sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));

    return (
      <div>
        <div className="textCenter">
          <span className="textHuge">
            {player}
          </span>
          <br/>
          <span className="textBig">
            Rating: {Math.round(ratings[player] / 100)}
          </span>
          <br/>
          <span className="textBig">
            Games: {total}</span>
        </div>
        <br />
        <br />
        <br />
        <table className="textCenter textBig">
          <tbody>
            <tr>
              <td />
              <td>
                <span>RATIO</span>
              </td>
              <td>
                <span>ELO</span>
              </td>
              <td>
                <span>WON</span>
              </td>
              <td>
                <span>LOST</span>
              </td>
              <td>
                <span>LAST</span>
              </td>
            </tr>
            {results.map((result, index) =>
              <tr key={result.opponent}>
                <td>
                  <Link to={`/players/${result.opponent}`}>
                    {result.opponent}
                  </Link>
                </td>
                <td>
                  <span>
                    {result.ratio}
                  </span>
                  <span className="textSmall">
                    ({result.total})
                  </span>
                </td>
                <td>
                  <span>
                    {result.elo}
                  </span>
                </td>
                <td>
                  <span>
                    {result.victories}
                  </span>
                  <span className="textSmall">
                    +{result.winStreak}
                  </span>
                </td>
                <td>
                  <span>
                    {result.defeats}
                  </span>
                  <span className="textSmall">
                    -{result.lossStreak}
                  </span>
                </td>
                <td>
                  <span className="textSmall">
                    {result.hours}H
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { games: state.games, ratings: state.ratings };
}

function mapDispatchToProps(dispatch) {
  return {};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Players);