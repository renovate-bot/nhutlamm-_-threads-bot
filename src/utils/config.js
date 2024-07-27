require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    port: Number(process.env.PORT),
    clientId: process.env.CLIENT_ID,
    devId: process.env.DEV_ID.split(',') || undefined,
    mongodb: process.env.DATABASE_URL,
    totalShards: parseInt(process.env.TOTAL_SHARDS) || 1,
    shardsPerClusters: parseInt(process.env.SHARDS_PER_CLUSTERS) || 6,
    color: {
        main: '#2c2d31',
        info: '#f0ad4e',
        success: '#22bb33',
        danger: '#bb2124',
    },
    urlDiscord: 'https://discord.com',
    linkDiscord: 'https://discord.gg/ZgkVqxk2ha',
    linkInvite:
        'https://discord.com/oauth2/authorize?client_id=1208388247114354718&permissions=552738352312&scope=applications.commands%20bot',
};
