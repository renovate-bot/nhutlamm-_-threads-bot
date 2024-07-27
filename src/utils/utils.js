module.exports = class utils {
    static formatTime(time) {
        const days = Math.floor(time / 86400);
        const hours = Math.floor(time / 3600) % 24;
        const minutes = Math.floor(time / 60) % 60;
        const seconds = Math.floor(time % 60);
        if (minutes == 0) {
            return `${seconds}s`;
        } else if (hours == 0) {
            return `${minutes}m ${seconds}s`;
        } else if (days == 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else {
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static indexPlus(number) {
        const num = Number(number);
        return num + 1;
    }
};
