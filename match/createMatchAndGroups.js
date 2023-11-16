require('dotenv').config()
const { EmbedBuilder, ChannelType } = require('discord.js');
require('dotenv').config()

const { formatIsoDate } = require('../utils/functions')
const { createMatch, getMatch, getProfile } = require('../mongo/functions')

const createMatchMessage = require('./createMatchMessage')
const matchParameters = require('./matchParameters')
const determineMatchCategory = require('./determineMatchCategory')

function sliceIntoGroups(array, groupSize) {
  const groups = [];
  for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize));
  }
  return groups;
}

async function matchCreation(channel, match_type, world_tier) {
  const matchCategory = determineMatchCategory(channel)

  const messages = await channel.messages.fetch({ limit: 1 });
  const lastMessage = messages.first();
  const timestamp = lastMessage ? lastMessage.createdTimestamp : Date.now();
  const isoTimestamp = formatIsoDate(timestamp) 
  const matchName = `${match_type}_${world_tier}_${matchCategory}_${isoTimestamp}`;
  const existingMatch = await getMatch(matchName)
  const match = !existingMatch ? await createMatch(match_type, world_tier, matchCategory) : null
  if (!match) return;
  const matchMessage = createMatchMessage(channel, match_type, world_tier);
  return matchMessage ? channel.send(matchMessage) : null;
}

async function createThreadAndSendMessages(channel, title, group, getProfile) {
  const threadName = title;
    const thread = await channel.threads.create({
        name: threadName,
        autoArchiveDuration: 60,
        type: ChannelType.PrivateThread,
        reason: 'Matchmaking',
    });

    let threadMessage = '';
    for (const playerId of group) {
        const player = await getProfile(playerId);
        if (player) {
            threadMessage += `<@${playerId}> - BattleTag:\n> ${player.battle_tag}\n`;
        } else {
            console.log(`Player not found: ${playerId}`);
        }
    }

    if (threadMessage) {
        await thread.send(threadMessage);
    }

    return thread;
}

async function processMessages(client, channel, getMatch, getProfile) {
  const messages = await channel.messages.fetch();
  const quickplayCategory = '1173560986519740486';
  const raidsCategory = '1172961227379576832';

  let processingPromises = [];

  for (const m of messages.values()) {
      if (!m || !m.embeds[0]) continue;

      const matchTitle = m.embeds[0].title;
      const matchTypeField = m.embeds[0].fields.find(f => f.name === '• Type');
      const worldTierField = m.embeds[0].fields.find(f => f.name === '• World Tier');
      const timestamp = m.createdTimestamp;
      const minutesAgo = (Date.now() - timestamp) / 60000;
      const matchCategory = determineMatchCategory(channel)
      const matchId = `${matchTypeField.value}_${worldTierField.value}_${matchCategory}_${formatIsoDate(timestamp)}`;

      const timeLimit = channel.parentId === quickplayCategory ? 5 : 90; // 5 minutes for quickplay, 90 for raids

      if (minutesAgo > timeLimit) {
          const match = await getMatch(matchId);
          if (match && match.players && match.players.length > 0) {
              const playerGroups = sliceIntoGroups(match.players, 4);
              const validGroups = playerGroups.filter(group => group.length >= 4); // Adjust the minimum group size if needed          
              let threadPromises = validGroups.map((group, index) => createThreadAndSendMessages(channel, `${matchTitle} - Group ${index + 1}`, group, getProfile));
              processingPromises.push(Promise.all(threadPromises));
          }
          // if (m && !m.deleted) {
          if (m && !m.deleted) {
            processingPromises.push(m.delete().catch(console.error));
          }
          // processingPromises.push(m.delete().catch(console.error));
      }
  }

  return Promise.all(processingPromises);
}

async function createMatchAndGroups(client) {
  const quickplayCategory = '1173560986519740486'
  const raidsCategory = '1172961227379576832'
  
  const channels = await client.guilds.cache.get(`${process.env.GUILD_ID}`).channels.fetch()
  const channelsInCategory = channels.filter(c => c.parentId === quickplayCategory || c.parentId === raidsCategory);

  for (const [channelId, channel] of channelsInCategory) {
    const matchCategory = determineMatchCategory(channel);
    const { match_type, world_tier } = await matchParameters(channel);
    const messages = await channel.messages.fetch()
    if (channel.parentId === quickplayCategory) {
        // Handle quickplay logic
        if (messages.size === 0) await matchCreation(channel, match_type, world_tier, matchCategory)
        await processMessages(client, channel, getMatch, getProfile);
        // if (messages.size < 1) return matchCreation(channel, match_type, world_tier, matchCategory)
    } else if (channel.parentId === raidsCategory) {
        // Handle raids logic
        if (messages.size === 0) await matchCreation(channel, match_type, world_tier, matchCategory)
        await processMessages(client, channel, getMatch, getProfile);
        // if (messages.size < 1) return matchCreation(channel, match_type, world_tier, matchCategory)
    }
  }
}

module.exports = createMatchAndGroups