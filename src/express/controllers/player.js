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
        opponent, victories: 0, defeats: 0, ties: 0, total: 0,
      };
      if (game.rankings[opponent] > game.rankings[player])
        acc[opponent].victories += 1;
      if (game.rankings[opponent] == game.rankings[player])
        acc[opponent].ties += 1;
      if (game.rankings[opponent] < game.rankings[player])
        acc[opponent].defeats += 1;
      acc[opponent].total += 1;
      acc[opponent].last_date = game.date;
    });
    return acc;
  }, {});
  delete(encounters[player]);

  const victories = Object.keys(encounters)
    .map((player) => ({ player, count: encounters[player].victories }))
    .sort((a , b) => b.count - a.count);
  const defeats = Object.keys(encounters)
    .map((player) => ({ player, count: encounters[player].defeats }))
    .sort((a , b) => b.count - a.count);
  const ties = Object.keys(encounters)
    .map((player) => ({ player, count: encounters[player].ties }))
    .sort((a , b) => b.count - a.count);

  res.render('player.hbs', { player, rating, victories, defeats, ties });
};

module.exports = {
  playerCtrl,
};
