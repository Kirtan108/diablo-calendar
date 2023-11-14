const { createMatchGroups } = require('./utils/functions');

function extendClient(client) {
    client.createMatchGroups = createMatchGroups(client)
}

module.exports = extendClient;