const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");

class Root extends React.Component {
  render() {
    return (
      <div className="Root">
        <div id="main-background">
          <div className="padding-left"></div>
          <div className="contents"></div>
          <div className="padding-right"></div>
        </div>
        <div id="main-wrapper">
          <div className="padding-left"></div>
          <div className="contents">
            <div className="card">
              <h1 className="textHuge textCenter">TOWERFALL<br/>SCORING SYSTE<a href="/altboard">M</a></h1>
              <div className="menu textCenter">
                LEADERBOARDS:
                <a className="textBig" href="/">ALL TIME</a>
                <a className="textBig" href="/weekly">WEEKLY</a>
                <a className="textBig" href="/daily">DAILY</a>
              </div>
              <div className="menu textCenter">
                GAMES:
                <a className="textBig" href="/games">HISTORY</a>
                <a className="textBig" href="/add">+ NEW GAME</a>
              </div>
              <br/>
              <br/>
              <br/>
            </div>
          </div>
          <div className="padding-right"></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Root);