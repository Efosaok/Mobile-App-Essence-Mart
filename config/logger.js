import { logger, consoleTransport } from "react-native-logs";
import CloudWatches from "../shared/methods/CloudWatch";

const defaultConfig = {
  severity: "debug",
  transport: (...props) => {
    //   integrate my custom log to firebase
    CloudWatches(props[0].msg)
    return consoleTransport(...props)
  },
  transportOptions: {
    color: "ansi", // custom option that color consoleTransport logs
  },
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  async: true,
  dateFormat: "local",
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = logger.createLogger(defaultConfig);
log.error("Send this log to Sentry");
export default log;
