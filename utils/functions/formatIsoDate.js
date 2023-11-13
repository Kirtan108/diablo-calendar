function formattedIsoDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString()
        .replace(/[^0-9]/g, "") // Removes all non-numeric characters
        .substring(0, 12); // Keeps only the first 14 characters (YYYYMMDDHHMMSS)
}

module.exports = formattedIsoDate;