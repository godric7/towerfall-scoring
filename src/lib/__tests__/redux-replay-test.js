// @flow

const { replayLogsThunk, replayMiddleware } = require("../redux-replay.js");

describe("ReduxReplay", () => {
  describe("replayLogsThunk()", () => {
    it("should dispatch logged action with replay=true", () => {
      const log = { type: "TEST", payload: 1 };
      const fakeOnRead = cb => {
        cb(JSON.stringify(log));
        cb(null);
      };
      const fakeDispatch = jest.fn();
      const expected = Object.assign({}, log, { replay: true });
      replayLogsThunk(fakeOnRead)(fakeDispatch).then(() => {
        expect(fakeDispatch.mock.calls[0]).toEqual([expected]);
      });
    });

    it("should dispatch all logged action", () => {
      const logs = [
        { type: "TEST", payload: 1 },
        { type: "TEST", payload: 2 },
        { type: "TEST", payload: 3 }
      ];
      const fakeOnRead = cb => {
        logs.forEach(log => cb(JSON.stringify(log)));
        cb(null);
      };
      const fakeDispatch = jest.fn();

      replayLogsThunk(fakeOnRead)(fakeDispatch).then(() => {
        expect(fakeDispatch.mock.calls.length).toEqual(logs.length);
      });
    });
  });

  describe("replayMiddleware()", () => {
    it("should write dispatched actions", () => {
      const fakeWriteLog = jest.fn();
      const fakeStore = {};
      const fakeNext = jest.fn();
      const action = { type: "TEST", payload: 1 };

      const expected = JSON.stringify(action);
      const middleware = replayMiddleware(fakeWriteLog);
      middleware(fakeStore)(fakeNext)(action);

      expect(fakeWriteLog.mock.calls.length).toEqual(1);
      expect(fakeWriteLog.mock.calls[0]).toEqual([expected]);
      expect(fakeNext.mock.calls.length).toEqual(1);
    });
  });
});
