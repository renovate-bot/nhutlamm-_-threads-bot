const { mongoose, Schema } = require('mongoose');

const config = new mongoose.Schema({
    guildId: { type: String },
    category: { type: String },
    channel: { type: String },
    createCfs: { type: String },
    reviewChannel: { type: String },
    replyChannel: { type: String },
    postsConfession: [
        {
            type: Schema.Types.String,
            ref: 'confessions',
        },
    ],
});

const configSchema = mongoose.model('configs', config);
module.exports = configSchema;
