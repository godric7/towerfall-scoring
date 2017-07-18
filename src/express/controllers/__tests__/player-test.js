// @flow

const { playerSerializer } = require("../player.js");

const { mockGame } = require("../../../types/mocks.js");

describe("player-test.js", () => {
  describe("playerSerializer()", () => {
    it("return expected results", () => {
      const mockGames = [
        mockGame({ rankings: { p2: 1, p3: 2, p4: 3 }, date: "1990-01-02" }),
        mockGame({ rankings: { p4: 1, p2: 2, p1: 3 }, date: "1990-01-03" }),
        mockGame({ rankings: { p1: 1, p2: 2, p3: 3 }, date: "1990-01-01" })
      ];
      const mockRatings = {
        p1: 500,
        p2: 200,
        p3: 400,
        p4: 100
      };
      const results = playerSerializer(
        "p1",
        mockGames,
        mockRatings,
        "1990-01-04"
      );
      expect(results).toEqual({
        rating: 5,
        results: [
          {
            elo: "0.5",
            ratio: "1.0",
            opponent: "p3",
            victories: 1,
            defeats: 0,
            hours: -72,
            lossStreak: 0,
            winStreak: 1,
            total: 1
          },
          {
            elo: "0.5",
            ratio: "0.5",
            opponent: "p2",
            victories: 1,
            defeats: 1,
            hours: -24,
            lossStreak: 1,
            winStreak: 0,
            total: 2
          },
          {
            elo: "0.5",
            ratio: "0.0",
            opponent: "p4",
            victories: 0,
            defeats: 1,
            hours: -24,
            lossStreak: 1,
            winStreak: 0,
            total: 1
          }
        ],
        total: 2
      });
    });
  });
});
