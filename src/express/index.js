// @flow

const express = require('express');
const expressHandlerbars  = require('express-handlebars');
const handlerbarsHelpers = require('handlebars-helpers');
const bodyParser = require('body-parser');

const { addGameCtrl } = require('./controllers/add-game.js');
const { altLeaderBoardCtrl } = require('./controllers/alt-leaderboard.js');
const { gamesCtrl } = require('./controllers/games.js');
const { indexCtrl } = require('./controllers/index.js');
const { logsCtrl } = require('./controllers/logs.js');
const { playerCtrl } = require('./controllers/player.js');
const { dailyCtrl, weeklyCtrl } = require('./controllers/weekly.js');


const app = express();

const paths = {
  views: `${__dirname}/views/`,
  statics: `${__dirname}/statics/`
};

const engine = expressHandlerbars.create({
  layoutsDir: paths.views,
  defaultLayout: 'main.hbs',
  extname: '.hbs',
  helpers: handlerbarsHelpers()
});
app.set('views', paths.views);
app.engine('.hbs', engine.engine);
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(paths.statics));

app.all('/', indexCtrl);
app.all('/add', addGameCtrl);
app.all('/altboard', altLeaderBoardCtrl);
app.all('/logs', logsCtrl);
app.all('/games', gamesCtrl);
app.all('/players/:player', playerCtrl);
app.all('/daily', dailyCtrl);
app.all('/weekly', weeklyCtrl);

module.exports = {
  app,
};
