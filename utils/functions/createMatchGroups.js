require('dotenv').config()
const { EmbedBuilder, ChannelType } = require('discord.js');

const { formatIsoDate, createMatchMessage } = require('../../utils/functions')
const { createMatch } = require('../../mongo/functions')

function sliceIntoGroups(array, groupSize) {
  const groups = [];
  for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize));
  }
  return groups;
}

async function createMatchGroups(client, getMatch, getProfile, createMatchMessage, createMatch){

  const MATCH_CHANNEL = "1172963206424182997"
  const channel = await client.guilds.cache.get(`${process.env.GUILD_ID}`).channels.cache.get(`${MATCH_CHANNEL}`)

  async function matchCreation(){
    const match_type = 'boss'
    const world_tier = '4'
    const match = await createMatch(match_type, world_tier)
    if (!match) return
    const durielMatchMessage = createMatchMessage(match_type, world_tier)
    return channel.send(durielMatchMessage)
  }
  setInterval(async () => {
    const messages = await channel.messages.fetch()
    if (messages.size === 0) return matchCreation()
    for (const m of messages.values()) {
        if (!m || !m.embeds[0]) return
        const matchTitle = await m.embeds[0].title
        const matchType = await m.embeds[0].fields.find(f => f.name === '• Type')
        const worldTier = await m.embeds[0].fields.find(f => f.name === '• World Tier')
        const timestamp = await m.createdTimestamp //.embeds[0].timestamp // .footer.text
        const isoTimestamp = formatIsoDate(timestamp) // formatIsoDiscordTimestamp(timestamp)

        const matchId = `${matchType.value}_${worldTier.value}_${isoTimestamp}`
        const minutesAgo = (Date.now() - timestamp) / 60000
        if (minutesAgo > 5) {
          const match = await getMatch(matchId)
          if (match && match.players && match.players.length > 0) {
            const playerGroups = sliceIntoGroups(match.players, 4); // Slice players into groups of 4
            let groupNumber = 1;

            for (const group of playerGroups) {
               const threadName = `${matchTitle} - Group ${groupNumber}`
               const thread = await m.channel.threads.create({
                 name: threadName,
                 autoArchiveDuration: 60,
                 type: ChannelType.PrivateThread,
                 reason: 'Matchmaking',
                });
                // const thread = await m.startThread({ name: 'Match Group', autoArchiveDuration: 60, reason: 'Matchmaking' });
                for (const playerId of group) {
                  thread.members.add(playerId)
                  const player = await getProfile(playerId); // Fetch player data from MongoDB
                  thread.send(`<@${playerId}> - BattleTag: ${player.battle_tag}`); // Post player information
                }
                groupNumber++;
                // setTimeout(async () => await thread.delete(), 60000); // Delete thread after 1 minute
            }
            await m.delete().catch(console.error)
          }
          await matchCreation()
        }
    }
  }, 1000 * 5)
}

module.exports = createMatchGroups