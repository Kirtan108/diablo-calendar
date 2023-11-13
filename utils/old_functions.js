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

async function deleteMessages(client){
    setInterval(async () => {
      const messages = await client.guilds.cache.get(`${process.env.GUILD_ID}`).channels.cache.get(`${process.env.RAID_CHANNEL}`).messages.fetch()
      await messages.filter(async m => {
        if (!m) return
        if (m.id === '1081866695385296976') return
        const timestamp = await m.createdTimestamp
        const hoursAgo = (Date.now() - timestamp) / 3600000
        if (hoursAgo > 12){
          await m.delete().catch(err => err)
        } 
      })
    }, 1000 * 30)
}

async function raffeWinners(client){
    setInterval(async () => {
      const messages = await client.guilds.cache.get(`${process.env.GUILD_ID}`).channels.cache.get(`${process.env.RAFFLE_CHANNEL}`).messages.fetch()
      await messages.filter(async m => {
        if (!m || m.author.id !== client.user.id || !m.embeds[0] || m.content.startsWith("**ENDED**")) return
        const endRaffle = m.embeds[0].data.fields[3].value.match(/\d+/g)
        const timeEnd = parseInt(endRaffle[0]) * 1000
        // const currentTime = Date.now()
        // const timeDiff = timeEnd - currentTime
        // const hoursRemaining = timeDiff / 3600000;
        // if (timeEnd > Date.now()) return console.log(hoursRemaining)
        if (timeEnd <= Date.now()) {
          const winnersEnd = m.embeds[0].data.fields[2].name.match(/\d+/g)
          const numWinners = winnersEnd ? parseInt(winnersEnd[0]) : null
          const receivedEmbed = m.embeds[0]
          const newEmbed = EmbedBuilder.from(receivedEmbed)
          newEmbed.setColor(0x000000)
          const Raffle = await m.embeds[0].footer.text
          const findRaffle = await raffleModel.findOne({ raffle: Raffle })
          if(!findRaffle) return
          const entries = findRaffle.entries
          const result = await weightedRandomChoices(entries, numWinners)
          let winnersM = "**Winners:** "
          let messageW = "Congratulations to"
          for (let i = 0; i < result.length; i++) {
            messageW += ` <@${result[i]}>`
            winnersM += ` <@${result[i]}>`
          }
          messageW += " <:woodpepo:945272494556864542> Open a <#930844499582779402> to claim the reward."
          winnersM += "\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯"
          newEmbed.setDescription(winnersM)
          await m.edit({ content: "**ENDED**", embeds: [newEmbed], components: [] }).catch(err => err)
          return m.reply(messageW)
          // .then(msg => {
          //   msg.channel.threads.create({
          //     name: "Congratulations",
          //     autoArchiveDuration: 1440,
          //     type: 12,
          //     invitable: true,
          //   }).then(thread => {
          //     //thread.members.add(user.id)
          //     thread.send(messageW)
          //   })
          // })
        } else return
      })
    }, 1000 * 2)
}

function formattedIsoDate(date) {
    return date.toISOString()
        .replace(/[^0-9]/g, "") // Removes all non-numeric characters
        .substring(0, 14); // Keeps only the first 14 characters (YYYYMMDDHHMMSS)
}

module.exports = { lastMessage }