require("./statics/css/styles.css");
require("./statics/font/Archer.ttf");

const React = require("react");
const ReactDOM = require("react-dom");
const { createStore } = require("./redux/store");
const { Provider } = require("react-redux");
const Root = require("./react/root.jsx");

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
