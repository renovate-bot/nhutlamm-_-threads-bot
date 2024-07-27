module.exports = {
    name: 'AntiCrash Plugin',
    version: '1.0.0',
    author: 'nhutlamm',
    initialize: (client) => {
        process.on('unhandledRejection', (e) => {
            console.log(e);
        });
        process.on('uncaughtException', (e) => {
            console.log(e);
        });
        process.on('uncaughtExceptionMonitor', (e) => {
            console.log(e);
        });
    },
};
