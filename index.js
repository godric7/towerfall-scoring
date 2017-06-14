// @flow

const fs = require('fs');
const readline = require('readline');

const { createStore } = require('./src/redux/store.js');
const { registerGame } = require('./src/redux/actions.js');
const { replayLogsThunk } = require('./src/lib/redux-replay.js');
const { app } = require('./src/express');

const config = require('./config.js');

const writeFunc = (line /*: string */) => {
  process.stdout.write(line);
  fs.appendFileSync(config.LOGFILE, `${line}\n`);
}

const istream = fs.createReadStream(config.LOGFILE, { flags: 'a+' });
const onRead = (callback /* (string|null) => void */) => {
  const rl = readline.createInterface({ input: istream });
  rl.on('line', callback);
  rl.on('end', callback);
};

const store = createStore(writeFunc, {});
store.dispatch(replayLogsThunk(onRead));

app.set('config', config);
app.set('store', store);
app.listen(3000);
