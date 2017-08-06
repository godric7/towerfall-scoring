const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");

class Games extends React.Component {
  render() {
    const { games } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td colSpan="4"></td>
          </tr>
          { games.map((game) => (
          <tr key={game.date}>
            <td className="textLeft"></td>
            { Object.keys(game.rankings).map((key) => (
            <td key={key} className="textLeft">{ game.rankings[key] }:
              <a href="/players/{{rank.player}}">{ key }</a>
            </td>
            )) }
          </tr>
        )) }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return { games: state.games };
}

function mapDispatchToProps(dispatch) {
  return {};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Games);