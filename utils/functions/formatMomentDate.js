const moment = require('moment');

function formattedMomentDate(date) {
    return moment(date).format('YYYYMMDD_HHmmss');
}

module.exports.formattedMomentDate = formattedMomentDate;