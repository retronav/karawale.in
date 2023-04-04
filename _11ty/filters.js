const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/utc"));

function formatDate(date, format) {
  return dayjs(date).utc().format(format);
}

module.exports = { formatDate };
