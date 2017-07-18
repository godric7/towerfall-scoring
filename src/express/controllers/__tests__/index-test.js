// @flow

const { createLeaderboardFromRatings } = require("../index.js");

describe("index-test.js", () => {
  describe("createLeaderboardFromRatings()", () => {
    it("create a leaderboard from ratings", () => {
      const ratings = { p1: 10994, p2: 10330, p3: 9670, p4: 9006 };
      const leaderboardEntries = createLeaderboardFromRatings(ratings);
      expect(leaderboardEntries).toEqual([
        { player: "p1", index: 1, rating: 110 },
        { player: "p2", index: 2, rating: 103 },
        { player: "p3", index: 3, rating: 97 },
        { player: "p4", index: 4, rating: 90 }
      ]);
    });
  });
});
