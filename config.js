// @flow

/*flow-include
  export type Config = {|
    HOST: string,
    PORT: string,
    LOGFILE: string,
    PASSWORD: string,
  |};
*/

module.exports = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || "3000",
  LOGFILE: process.env.LOGFILE || "./logs/redux.log",
  PASSWORD: process.env.PASSWORD || ""
};
