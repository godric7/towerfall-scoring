// @flow

/*flow-include
  import type { Action, Dispatch, GetState, Next, Store, Middleware } from 'redux';
  type Thunk = (dispatch: Dispatch, getState: GetState, extraArgs: any) => any;
*/

function replayLogsThunk(
  onRead /*: ((string | null) => void) => void */
) /*: Thunk */ {
  return (dispatch /*: Dispatch */) => {
    return new Promise(resolve => {
      onRead(line => {
        if (line == null) return resolve();
        const action = JSON.parse(line);
        action.replay = true;
        dispatch(action);
      });
    });
  };
}

function replayMiddleware(writeLog /*: (string) => void */) /*: Middleware */ {
  return (store /*: Store */) => (next /*: Next */) => (
    action /*: Action */
  ) => {
    if (typeof action === "object" && action.replay !== true)
      writeLog(JSON.stringify(action));
    next(action);
  };
}

module.exports = {
  replayLogsThunk,
  replayMiddleware
};
