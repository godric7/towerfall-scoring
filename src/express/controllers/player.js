// @flow

const {
  getResultFromRating
} = require('../../lib/elo.js');

/*flow-include
import type { Request, Response } from 'express';
import type { State } from '../../redux/store.js';
import type { Game, Player } from '../../types';
import type { ELORating } from '../../lib/elo.js';
*/

function playerSerializer(
  player /*: Player */,
  games /*: Array<Game> */,
  ratings /*: { [Player]: ELORating } */,
  now /*: string */ = (new Date()).toISOString()
) {
  const rating = Math.round(ratings[player] / 100);
  const time = (new Date(now)).getTime();

  const encounters = games
    .sort((a, b) => (b.date < a.date ? 1 : (b.date > a.date ? -1 : 0)))
    .filter((game) => Object.keys(game.rankings).includes(player))
    .reduce((acc, game) => {
      const last_date = game.date;
      Object.keys(game.rankings).forEach((opponent) => {
        acc[opponent] = acc[opponent] || {
          opponent, victories: 0, defeats: 0, hours: 0, win_streaks: 0, loss_streaks: 0, total: 0,
        };
        if (game.rankings[opponent] > game.rankings[player]) {
          acc[opponent].victories += 1;
          acc[opponent].win_streaks += 1;
          acc[opponent].loss_streaks = 0;
        }
        else if (game.rankings[opponent] == game.rankings[player]) {
          acc[opponent].win_streaks = 0;
          acc[opponent].loss_streaks = 0;
        }
        else if (game.rankings[opponent] < game.rankings[player]) {
          acc[opponent].defeats += 1;
          acc[opponent].win_streaks = 0;
          acc[opponent].loss_streaks += 1;
        }
        const last = new Date(game.date).getTime();
        acc[opponent].hours = Math.round((last - time) / (1000 * 60 * 60));
        acc[opponent].total += 1;
      });
      return acc;
    }, {});

  const total = encounters[player].total;
  delete(encounters[player]);

  const results = Object.keys(encounters)
    .map((opponent) => ({
      opponent: opponent,
      value: (getResultFromRating(ratings[player], ratings[opponent]) / 100).toFixed(1),
    }))
    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

  const victories = Object.keys(encounters)
    .map((opponent) => ({
      opponent: opponent,
      count: encounters[opponent].victories,
      ratio: (encounters[opponent].victories / encounters[opponent].total).toFixed(1),
    }))
    .sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));
  const defeats = Object.keys(encounters)
    .map((opponent) => ({
      opponent: opponent,
      count: encounters[opponent].defeats,
      ratio: (encounters[opponent].defeats / encounters[opponent].total).toFixed(1),
    }))
    .sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));
  const win_streaks = Object.keys(encounters)
    .map((opponent) => ({
      opponent: opponent,
      count: encounters[opponent].win_streaks,
    }))
    .sort((a, b) => b.count - a.count);
  const loss_streaks = Object.keys(encounters)
    .map((opponent) => ({
      opponent: opponent,
      count: encounters[opponent].loss_streaks,
    }))
    .sort((a, b) => b.count - a.count);
  const hours = Object.keys(encounters)
    .map((opponent) => ({
      opponent,
      count: encounters[opponent].hours
    }))
    .sort((a, b) => b.count - a.count);
  return {total, rating, results, victories, defeats, win_streaks, loss_streaks, hours};
}

function playerCtrl (
  req /*: Request */,
  res /*: Response */
) {
  const store = req.app.get('store');
  const state /*: State */ = store.getState();

  const player = req.params.player;

  if (!state.ratings[player])
    return res.status(404).end();

  const {
    total, rating, results, victories, defeats, ties, win_streaks, loss_streaks, hours,
  } = playerSerializer(player,  state.games, state.ratings);

  res.render('player.hbs', {
    player, rating, results, total, victories, defeats, win_streaks, loss_streaks, hours,
  });
};

module.exports = {
  playerSerializer,
  playerCtrl,
};
