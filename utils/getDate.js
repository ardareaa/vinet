const moment = require('moment-timezone');

module.exports = function (ms, format = "DD MMM, YYYY HH:mm") {
    !ms && (ms = moment.tz("ASIA/ISTANBUL").valueOf());

    const months = {
        Jan: "Ocak",
        Feb: "Şubat",
        Mar: "Mart",
        Apr: "Nisan",
        May: "Mayıs",
        Jun: "Haziran",
        Jul: "Temmuz",
        Aug: "Ağustos",
        Sep: "Eylül",
        Oct: "Ekim",
        Nov: "Kasım",
        Dec: "Aralık"
    };

    let date = moment.tz(ms, "ASIA/ISTANBUL").format(format);

    Object.keys(months).forEach((key) => {
        date = date.replace(key, months[key]);
    });

    return date;
}