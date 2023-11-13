function formatIsoDiscordTimestamp(timestamp) {
    // Remove the extra three digits (microseconds) from the timestamp
    const adjustedTimestamp = timestamp.replace(/(\.\d{3})\d{3}/, '$1');
    // Convert to a Date object and then to an ISO string
    const date = new Date(adjustedTimestamp);
    return date.toISOString()
         .replace(/[^0-9]/g, "") // Removes all non-numeric characters
         .substring(0, 14); // Keeps only the first 14 characters (YYYYMMDDHHMMSS)
}

module.exports = formatIsoDiscordTimestamp;