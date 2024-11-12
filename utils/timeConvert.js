module.exports = function(zaman) {
    const now = new Date();
    const eventTime = new Date(zaman);
    const timeDifference = now - eventTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Ortalama olarak
    const years = Math.floor(days / 365); // Ortalama olarak

    if (seconds < 60) {
        return seconds === 0 ? "az önce" : `${seconds} saniye önce`;
    } else if (minutes < 60) {
        return `${minutes} dakika önce`;
    } else if (hours < 24) {
        return `${hours} saat önce`;
    } else if (days < 7) {
        return `${days} gün önce`;
    } else if (weeks < 4) {
        return `${weeks} hafta önce`;
    } else if (months < 12) {
        return `${months} ay önce`;
    } else {
        return `${years} yıl önce`;
    }
}
