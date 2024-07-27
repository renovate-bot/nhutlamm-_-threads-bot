require('module-alias/register');
const { Client, Collection } = require('discord.js');
const { ClusterClient } = require('discord-hybrid-sharding');

const mongoose = require('~/plugins/mongoose.js');
const logger = require('~/utils/logger.js');
const utils = require('~/utils/utils.js');

module.exports = class BotClient extends Client {
    constructor(option) {
        super(option);
        this.cooldown = new Collection();
        this.commandAliases = new Collection();
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.buttonsComponents = new Collection();
        this.modalComponents = new Collection();
        this.slashDatas = [];
        this.utils = utils;
        this.cluster = new ClusterClient(this);
        this.cluster
            .broadcastEval(`this.guilds.cache.size`)
            .then((results) => logger.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`, 'client'));
    }
    async start(token) {
        await mongoose.connect();
        await this.login(token);

        ['slash', 'buttons', 'modals', 'events', 'plugins'].forEach((handler) => {
            require(`~/handlers/${handler}`)(this);
        });
    }
};
