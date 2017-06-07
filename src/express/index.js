// @flow

const express = require('express');
const expressHandlerbars  = require('express-handlebars');
const bodyParser = require('body-parser');

const { indexCtrl } = require('./controllers/index.js');
const { addGameCtrl } = require('./controllers/add-game.js');
const { logsCtrl } = require('./controllers/logs.js');
const { playerCtrl } = require('./controllers/player.js');

const app = express();

const paths = {
  views: `${__dirname}/views/`,
  statics: `${__dirname}/statics/`
};

const engine = expressHandlerbars.create({
  layoutsDir: paths.views,
  defaultLayout: 'main.hbs',
  extname: '.hbs',
});
app.set('views', paths.views);
app.engine('.hbs', engine.engine);
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(paths.statics));

app.all('/', indexCtrl);
app.all('/add', addGameCtrl);
app.all('/logs', logsCtrl);
app.all('/players/:player', playerCtrl);

module.exports = {
  app,
};
