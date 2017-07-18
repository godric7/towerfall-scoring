// @flow

const fs = require("fs");

/*flow-include
import type { Request, Response } from 'express';
import type { Config } from '../../../config.js';
*/

const logsCtrl = (req /*: Request */, res /*: Response */) => {
  const config /*: Config */ = req.app.get("config");
  res.header("content-type", "text/plain");
  res.send(fs.readFileSync(config.LOGFILE));
};

module.exports = {
  logsCtrl
};
