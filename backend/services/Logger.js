const log4js = require("log4js");
log4js.configure({
  appenders: { access: { type: "file", filename: "access.log" } },
  categories: { default: { appenders: ["access"], level: "debug" } }
});

const logger = log4js.getLogger("access");

module.exports = {logger}