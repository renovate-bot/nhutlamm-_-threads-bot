const mongoose = require('mongoose');

const replie = new mongoose.Schema({
    index: { type: String, default: 1 },
    idUser: { type: String },
    reviewReplyId: { type: String },
    contents: { type: String },
    channel: { type: String },
    replyId: { type: String },
});
const replieSchema = mongoose.model('replies', replie);
module.exports = replieSchema;
