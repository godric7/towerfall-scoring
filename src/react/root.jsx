const React = require("react");
const PropTypes = require("prop-types");

const { connect } = require("react-redux");
const { HashRouter, Link, Route, Switch } = require("react-router-dom");
const { withRouter } = require("react-router");

class Root extends React.Component {

  render() {
    console.log('ah');
    return (
      <div>
        <div>
          <div id="main-background">
            <div className="padding-left"></div>
            <div className="contents"></div>
            <div className="padding-right"></div>
          </div>
          <div id="main-wrapper">
            <div className="padding-left"></div>
            <div className="contents">
              <div className="card">
                <h1 className="textHuge textCenter">TOWERFALL<br/>SCORING SYSTE<Link to="/altboard">M</Link></h1>
                <div className="menu textCenter">
                  LEADERBOARDS:
                  <Link className="textBig" to="/">ALL TIME</Link>
                  <Link className="textBig" to="/weekly">WEEKLY</Link>
                  <Link className="textBig" to="/daily">DAILY</Link>
                </div>
                <div className="menu textCenter">
                  GAMES:
                  <Link className="textBig" to="/games">HISTORY</Link>
                  <Link className="textBig" to="/add">+ NEW GAME</Link>
                </div>
                <br/>
                <br/>
                <br/>
                <hr/>
                <Switch>
                  <Route exact path="/weekly" component={Home}/>
                  {this.props.children}
                </Switch>
                <span>{Math.random()}</span>
                <hr/>
              </div>
            </div>
            <div className="padding-right"></div>
          </div>
        </div>
      </div>
    )
  }
}

Root.contextTypes= {
  router: PropTypes.object.isRequired
},

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

module.exports = Root;