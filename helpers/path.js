// creates root of the project directory name(helps navigating when using path)

const path = require("path");

module.exports = path.dirname(require.main.filename);

