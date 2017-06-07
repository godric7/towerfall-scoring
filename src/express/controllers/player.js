// @flow

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
*/

const playerCtrl = (req /*: Request */, res /*: Response */) => {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();

  const player = req.params.player;

  if (!state.ratings[player])
    return res.status(404).end();

  const rating = Math.round(state.ratings[player] / 100);
  const games = state.games
    .filter((game) => Object.keys(game.rankings).includes(player))

  const encounters = games.reduce((acc, game) => {
    const last_date = game.date;
    Object.keys(game.rankings).forEach((opponent) => {
      acc[opponent] = acc[opponent] || {
        opponent, victories: 0, defeats: 0, ties: 0, hours: 0, win_streaks: 0, loss_streaks: 0,
      };
      if (game.rankings[opponent] > game.rankings[player]) {
        acc[opponent].victories += 1;
        acc[opponent].win_streaks += 1;
        acc[opponent].loss_streaks = 0;
      }
      else if (game.rankings[opponent] == game.rankings[player]) {
        acc[opponent].ties += 1;
        acc[opponent].win_streaks = 0;
        acc[opponent].loss_streaks = 0;
      }
      else if (game.rankings[opponent] < game.rankings[player]) {
        acc[opponent].defeats += 1;
        acc[opponent].win_streaks = 0;
        acc[opponent].loss_streaks += 1;
      }
      const time = (new Date(game.date)).getTime();
      acc[opponent].hours = Math.round((time - Date.now()) / (1000 * 60 * 60));
    });
    return acc;
  }, {});
  delete(encounters[player]);

  const victories = Object.keys(encounters)
    .map((opponent) => ({ opponent, count: encounters[opponent].victories }))
    .sort((a , b) => b.count - a.count);
  const defeats = Object.keys(encounters)
    .map((opponent) => ({ opponent, count: encounters[opponent].defeats }))
    .sort((a , b) => b.count - a.count);
  const ties = Object.keys(encounters)
    .map((opponent) => ({ opponent, count: encounters[opponent].ties }))
    .sort((a , b) => b.count - a.count);
  const win_streaks = Object.keys(encounters)
    .map((opponent) => ({ opponent, count: encounters[opponent].win_streaks }))
    .sort((a , b) => b.count - a.count);
  const loss_streaks = Object.keys(encounters)
    .map((opponent) => ({ opponent, count: encounters[opponent].loss_streaks }))
    .sort((a , b) => b.count - a.count);
  const hours = Object.keys(encounters)
    .map((opponent) => ({ opponent, count: encounters[opponent].hours }))
    .sort((a , b) => b.count - a.count);
  res.render('player.hbs', { player, rating, victories, defeats, ties, win_streaks, loss_streaks, hours });
};

module.exports = {
  playerCtrl,
};
