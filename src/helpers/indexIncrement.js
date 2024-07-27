const utils = require('~/utils/utils.js');

class IndexIncrement {
    static async Confession(config, confession) {
        const count = utils.indexPlus(config.postsConfession.length);
        confession.index = count;
        await confession.save().then(async () => {
            config.postsConfession.addToSet(confession.index);
            await config.save();
        });
    }

    static async Reply(confession, reply) {
        const count = utils.indexPlus(confession.replies.length);
        reply.index = count;
        await reply.save().then(async () => {
            confession.replies.addToSet(reply.index);
            await confession.save();
        });
    }
}

module.exports = IndexIncrement;
