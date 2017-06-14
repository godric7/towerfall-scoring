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
          opponent, victories: 0, defeats: 0, hours: 0, winStreak: 0, lossStreak: 0, total: 0,
        };
        if (game.rankings[opponent] > game.rankings[player]) {
          acc[opponent].victories += 1;
          acc[opponent].winStreak += 1;
          acc[opponent].lossStreak = 0;
        }
        else if (game.rankings[opponent] == game.rankings[player]) {
          acc[opponent].winStreak = 0;
          acc[opponent].lossStreak = 0;
        }
        else if (game.rankings[opponent] < game.rankings[player]) {
          acc[opponent].defeats += 1;
          acc[opponent].winStreak = 0;
          acc[opponent].lossStreak += 1;
        }
        const last = new Date(game.date).getTime();
        acc[opponent].hours = Math.round((last - time) / (1000 * 60 * 60));
        acc[opponent].total += 1;
      });
      return acc;
    }, {});

  const total = encounters[player].total;
  delete(encounters[player]);

  const results = Object.keys(encounters).map((opponent) => {
    return Object.assign({}, encounters[opponent], {
      elo: (getResultFromRating(ratings[player], ratings[opponent]) / 100).toFixed(1),
      ratio: (encounters[opponent].victories / encounters[opponent].total).toFixed(1),
    });
  }).sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));

  return {total, rating, results};
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
    total, rating, results,
  } = playerSerializer(player,  state.games, state.ratings);

  res.render('player.hbs', {
    player, total, rating, results,
  });
};

module.exports = {
  playerSerializer,
  playerCtrl,
};
