const mongoose = require('mongoose');
const logger = require('~/utils/logger.js');
const config = require('~/utils/config.js');

async function connect() {
    try {
        mongoose.connect(config.mongodb, {
            noDelay: true,
        });
        mongoose.connection.once('open', () => {
            logger.log(`[MONGO] Connected to Database !`, 'database');
        });
        mongoose.connection.once('disconnecting', () => {
            logger.log(`[MONGO] DisConnecting to Database.`, 'error');
        });
    } catch (error) {
        logger.log(`[MONGO] Error connecting to database`, 'error');
    }
}

module.exports = { connect };
