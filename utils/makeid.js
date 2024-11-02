module.exports = function (length = 20, options = {
    upper: true,
    lower: true,
    number: true
}) {
    const defaults = {
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        number: "0123456789",
        id: "abcdef012345"
    };

    let chars = typeof options === "string" ?
        options == "id" ?
        defaults.id :
        options :
        (options.upper ? defaults.upper : "") +
        (options.lower ? defaults.lower : "") +
        (options.number ? defaults.number : "");

    return Array.from({
        length
    }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}