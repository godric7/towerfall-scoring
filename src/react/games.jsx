const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");
const { Link } = require("react-router-dom");

class Games extends React.Component {
  render() {
    const { games } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td colSpan="4" />
          </tr>
          {games.map(game =>
            <tr key={game.date}>
              <td className="textLeft" />
              {Object.keys(game.rankings).map(key =>
                <td key={key} className="textLeft">
                  {game.rankings[key]}:
                  <Link to={`/players/${key}`}>{key}</Link>
                </td>
              )}
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Games);
