const convict = require('convict');
const config = convict(require('./schema'));
const stage = config.get('stage');

// Load the environment-specific configuration path.
config.load(require('./env/' + stage));

config.validate();

module.exports = config.get();