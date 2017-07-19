// @flow

const {
  computeRatingsFromRankings,
  getUpdatedRatingFromRankings
} = require("../elo.js");

describe("ELO", () => {
  describe("getUpdatedRatingFromRankings()", () => {
    it("should return the ELO updating according to the specs", () => {
      const ratings = { p1: 10000, p2: 10000, p3: 10000, p4: 10000 };
      const rankings = { p1: 1, p2: 2, p3: 3, p4: 4 };
      const updates = getUpdatedRatingFromRankings(ratings, rankings, 10);
      expect(updates).toEqual({ p1: 10501, p2: 10167, p3: 9833, p4: 9499 });
    });

    it("should return updates favorable to the winning players with lower ratings", () => {
      const ratings = { p1: 10000, p2: 20000, p3: 10000, p4: 10000 };
      const rankings = { p1: 1, p2: 2, p3: 3, p4: 4 };
      const updates = getUpdatedRatingFromRankings(ratings, rankings, 10);
      expect(updates).toEqual({ p1: 10547, p2: 20027, p3: 9880, p4: 9546 });
    });

    it("should return updates favorable to the tied players with lower ratings", () => {
      const ratings = { p1: 10000, p2: 20000, p3: 20000, p4: 10000 };
      const rankings = { p1: 1, p2: 1, p3: 2, p4: 2 };
      const updates = getUpdatedRatingFromRankings(ratings, rankings, 10);
      expect(updates).toEqual({ p1: 10427, p2: 20240, p3: 19573, p4: 9760 });
    });

    it("should not matter to the updates which order the scores are reported in", () => {
      const ratings = { p2: 20000, p1: 10000, p4: 10000, p3: 20000 };
      const rankings = { p3: 2, p2: 1, p4: 2, p1: 1 };
      const updates = getUpdatedRatingFromRankings(ratings, rankings, 10);
      expect(updates).toEqual({ p1: 10427, p2: 20240, p3: 19573, p4: 9760 });
    });
  });

  describe("computeRatingsFromRankings()", () => {
    it("should compute player ratings from one ranking", () => {
      const rankings = [{ p1: 1, p2: 2, p3: 3, p4: 4 }];
      const ratings = computeRatingsFromRankings(rankings, 10);
      expect(ratings).toEqual({ p1: 10501, p2: 10167, p3: 9833, p4: 9499 });
    });

    it("should compute player ratings from two rankings", () => {
      const rankings = [
        { p1: 1, p2: 2, p3: 3, p4: 4 },
        { p1: 1, p2: 2, p3: 3, p4: 4 }
      ];
      const ratings = computeRatingsFromRankings(rankings, 10);
      expect(ratings).toEqual({ p1: 10994, p2: 10330, p3: 9670, p4: 9006 });
    });
  });
});
