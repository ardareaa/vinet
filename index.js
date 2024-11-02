module.exports = {
    version: require('./package.json').version,

    /**
     * Lisans kontrol modulü, Kullanıcı lisans doğrulama işlemleri için kullanılmaktadır.
     * Bu modül, Vi Services geliştiricileri ve Lisans modulümüzü kullanan
     *   geliştiriciler için gerekli fonksiyonları içerir.
     * 
     * Dökümanlar ve kurulum için iletişime geçin.
     */
    LicenseManager: require('./LicenseManager'),

    /**
     * ReCaptcha modülü, Robot olmadığınızı doğrulama işlemleri için kullanılmaktadır.
     * Bu modül, ReCAPTCHA doğrulama jetonunu kontrol etmek için gerekli fonksiyonları içerir.
     */
    ReCaptcha: {
        /**
         * GoogleReCaptcha sınıfı, Google ReCAPTCHA doğrulamasını yapmak için kullanılır.
         */
        Google: require('./utils/recaptcha').Google,
    },

    /**
     * Bu fonksiyon, işletim sisteminin özgün UUID/GUID bilgisini senkron olarak alır, varsayılan olarak hashlenmiş şekilde döner.
     * @param {boolean} [original=false] - true ise makine kimliğinin orijinal değerini döndürür, aksi takdirde hashlenmiş (sha-256) değerini döndürür.
     */
    DeviceSerial: require('./utils/DeviceSerial'),

    /**
     * Rastgele bir id oluşturur.
     * 
     * @param {Number} [length=20] - Oluşturulacak id uzunluğu
     * @param {Object|String} options - Id opsiyonları. Varsayılan olarak büyük harf, küçük harf ve rakam içerir.
     * 
     * @example
     * makeId(10);                                 // Varsayılan seçeneklerle, örn: "aB3dE9gH2j"
     * makeId(10, "abcdef");                       // Özel karakter seti, örn: "dabcfaecdb"
     * makeId(10, { upper: false });               // Sadece küçük harf ve rakam, örn: "ab1cd2ef3g"
     * makeId(10, { upper: true, number: false }); // Sadece büyük ve küçük harf, örn: "ABcDefGhJk"
     * makeId(10, "id");                           // Özel kısa id formatı, örn: "bcf012de34"
     * 
     * @returns {String} Rastgele oluşturulmuş id.
     */
    makeId: require('./utils/makeId'),

    /**
     * Rastgele bir tam sayı döndürür.
     * @param {number} min - Rastgele sayının minimum değeri.
     * @param {number} max - Rastgele sayının maksimum değeri.
     * @returns {number} Rastgele bir tam sayı.
     */
    random: require('./utils/randomNumber'),

    /**
     * Versiyon dizesini daha okunabilir bir forma dönüştürür.
     * -beta ve -alpha etiketlerini düzenler.
     * @param {string} version - Düzenlenecek versiyon dizesi, varsayılanı vinet modul sürümüdür.
     * @returns {string} Düzenlenmiş versiyon dizesi.
     */
    versionString: (version = require('./package.json').version) => version.replace(/-beta.(\d+)/, " - Beta $1").replace(/-alpha.(\d+)/, " - Alpha $1"),

    /**
     * Belirtilen zaman damgasına (ms) göre tarihi döndürür.
     * Eğer zaman damgası verilmezse, mevcut zamanı kullanır.
     * @param {number} [ms] - Zaman damgası (milisaniye cinsinden).
     * @param {string} [format="DD MMM, YYYY HH:mm"] - Tarih formatı.
     * @returns {string} Belirtilen formatta tarih.
     */
    getDate: require('./utils/getDate.js'),


}