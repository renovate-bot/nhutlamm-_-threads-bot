const { mongoose, Schema } = require('mongoose');

const guild = new mongoose.Schema({
    idOwner: { type: String },
    idGuild: { type: String, unique: true },
    nameGuild: { type: String },
    configs: [{ type: Schema.Types.String, ref: 'configs' }],
});

const guildSchema = mongoose.model('guilds', guild);
module.exports = guildSchema;
