function isMoreThanFourDaysAgo(timestamp) {
    const fourDaysInMilliseconds = 4 * 24 * 60 * 60 * 1000; // Una semana en milisegundos
    const currentTime = new Date().getTime();
    
    // Calcula la diferencia en milisegundos entre el timestamp y la hora actual
    const timeDifference = currentTime - timestamp;

    // Comprueba si la diferencia es mayor que una semana
    const result = timeDifference > fourDaysInMilliseconds ? true : null
    return result
}

// async function lastMessage(interaction, channel, userId) {
//     const messages = await interaction.guild.channels.cache.get(channel).messages.fetch();
//     await messages.filter(async m => {
//         let verification
//         if (!m || m.content.includes(userId)){
//             verification = null
//         }
         
//         else true
//     })
// }

async function lastMessage(interaction, channel, userId) {
    const messages = await interaction.guild.channels.cache.get(channel).messages.fetch();

    const lastVerificationMessage = messages.find(m => m.content.includes(userId));

    if (lastVerificationMessage) {
        const messageTimestamp = lastVerificationMessage.createdTimestamp
        return isMoreThanFourDaysAgo(messageTimestamp)
    } else {
        return true
    }
}

module.exports = { lastMessage }