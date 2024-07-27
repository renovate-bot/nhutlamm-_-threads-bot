require('module-alias/register');
require('dotenv').config();
const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const logger = require('~/utils/logger.js');
const config = require('~/utils/config.js');

const manager = new ClusterManager(`${__dirname}/client.js`, {
    totalShards: config.totalShards,
    shardsPerClusters: config.shardsPerClusters,
    mode: 'process',
    token: config.token,
    restarts: {
        max: 5,
        interval: 60000 * 60,
    },
});

manager.on('clusterCreate', (cluster) => {
    logger.log(`- Launched Cluster ${cluster.id}`, 'client');
});

manager.spawn({ timeout: -1 });

manager.extend(
    new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    }),
);
