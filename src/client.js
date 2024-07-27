require('module-alias/register');
const { GatewayIntentBits } = require('discord.js');
const { getInfo } = require('discord-hybrid-sharding');
const BotClient = require('~/structures/client.js');
const config = require('~/utils/config.js');

const clientOptions = {
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    allowedMentions: {
        parse: ['roles', 'users', 'everyone'],
        repliedUser: false,
    },
};

const client = new BotClient(clientOptions);
client.start(config.token);
