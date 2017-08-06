const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");

class AllTime extends React.Component {
  render() {
    const { ratings } = this.props;
    const charts = Object.keys(ratings)
      .map(player => ({ player, rating: ratings[player] }))
      .sort((a, b) => b.rating - a.rating)

    return (
      <table className="textCenter textBig">
      { charts.map((chart, index) => (
        <tr key={ chart.player }>
          <td><span>{ index + 1 }</span></td>
          <td><a href="/players/{ chart.player }">{ chart.player }</a></td>
          <td><span>{ Math.round(chart.rating / 100) }</span></td>
        </tr>
      )) }
      </table>
    )
  }
}

function mapStateToProps(state) {
  return { ratings: state.ratings };
}

function mapDispatchToProps(dispatch) {
  return {};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AllTime);