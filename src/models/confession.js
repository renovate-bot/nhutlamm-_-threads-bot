const { mongoose, Schema } = require('mongoose');

const confession = new mongoose.Schema({
    index: { type: String, default: 1 },
    reviewMessageId: { type: String },
    threadId: { type: String },
    idOwner: { type: String },
    hideName: { type: Boolean },
    contents: { type: String },
    replies: [{ type: Schema.Types.String, ref: 'replies' }],
});

const confessionSchema = mongoose.model('confessions', confession);
module.exports = confessionSchema;
