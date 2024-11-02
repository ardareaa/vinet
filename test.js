const vinet = require('./');
console.log("Vi Services modülü başarıyla yüklendi.");


console.log("\n\n");


// Cihaz seri numarası
const originalHwid = vinet.DeviceSerial(true);
console.log("Cihaz seri numarası:", originalHwid);
// -> d3c3d6a6-100a-4ebd-bf79-f3a9e1a9a0e1

// Cihaz seri numarası şifrelenmiş (sha-256 hash)
const hashHwid = vinet.DeviceSerial(false);
console.log("Cihaz seri numarası (şifreli):", hashHwid);
// -> 970g8a65y62vfr13094b0de25131155fc69d76f8c8dc1538ee22d7862378d05a


console.log("\n\n");


// Küçük harf, büyük harf ve sayı
let id = vinet.makeId(20);
console.log("Rastgele ID (küçük harf, büyük harf ve sayı):", id);
// -> "n3oF2wS6nS35PNFbfLEw"

// Sadece küçük harf ve sayı
id = vinet.makeId(20, { lower: true, number: true });
console.log("Rastgele ID (sadece küçük harf ve sayı):", id);
// -> "awlm7fnjv4pu8ws0gpwr"

// Sadece "1234" ile oluşturur
id = vinet.makeId(20, "1234");
console.log("Rastgele ID (sadece '1234' ile):", id);
// -> "23113311443232314242"

// Sadece "abcdef" ve "012345" ile oluşturulur
id = vinet.makeId(20, "abcdef012345");
console.log("Rastgele ID (sadece 'abcdef012345' ile):", id);
// -> "020ced3f322c50f1fa5a"


console.log("\n\n");


// 0 ile 5 arasında rastgele sayı
const Rn0v5 = vinet.random(0, 5);
console.log("0 ile 5 arasında rastgele sayı:", Rn0v5);
// -> 5

// 5 ile 50 arasında rastgele sayı
const Rn5v50 = vinet.random(5, 50);
console.log("5 ile 50 arasında rastgele sayı:", Rn5v50);
// -> 18

// 2000 ile 2050 arasında rastgele sayı
const Rn2000v2050 = vinet.random(2000, 2050);
console.log("2000 ile 2050 arasında rastgele sayı:", Rn2000v2050);
// -> 2008


console.log("\n\n");


// Boş bırakılırsa vinet modul sürümü (1.0.3-beta.1.0.2)
const VinetVersion = vinet.versionString();
console.log("Vinets Versiyonu:", VinetVersion);
// -> 1.0.3 - Beta 1.0.2

let version = vinet.versionString("3.0.1");
console.log("Düzenlenmiş versiyon:", version);
// -> 3.0.1

version = vinet.versionString("3.0.1-beta.1.0");
console.log("Düzenlenmiş versiyon (beta):", version);
// -> 3.0.1 Beta 1.0

version = vinet.versionString("3.0.1-alpha.1.0");
console.log("Düzenlenmiş versiyon (alpha):", version);
// -> 3.0.1 Alpha 1.0


console.log("\n\n");


// Şuanki tarih
let tarih = vinet.getDate();
console.log("Şu anki tarih:", tarih);
// -> "20 Ekim, 2024 10:20"

// Belirli bir tarih
tarih = vinet.getDate(new Date("Oct 20, 2003 10:20"));
console.log("Belirli bir tarih:", tarih);
// -> "20 Ekim, 2003 10:20"

// Özel Format ile şuanki tarih
tarih = vinet.getDate(null, "DD MMM YYYY");
console.log("Özel format ile şu anki tarih:", tarih);
// -> "20 Ekim 2024"

// Özel Format ile belirli bir tarih
tarih = vinet.getDate(new Date("Oct 20, 2003 10:20"), "DD MMM YYYY");
console.log("Özel format ile belirli bir tarih:", tarih);
// -> "20 Ekim 2003"


console.log("\n\n");


const GoogleRecaptcha = new vinet.ReCaptcha.Google("6LdfZ3MqAAAAAH73Vebb5JqCChMCy2FlR74H95lA");
const app = require('express')();
app.use(require('express').json());
app.use(require('express').urlencoded({ extended: true }));
app.listen(18524, () => console.log('Recaptcha test için http://localhost:18524 adresini ziyaret et.'));
app.get('/', (req, res) => res.send('<script src="https://www.google.com/recaptcha/api.js" async defer></script><form method="post"><div class="g-recaptcha" data-sitekey="6LdfZ3MqAAAAAEFhH_jZbb3dBqFs0rxN0JMIO2hv"></div><button type="submit">Gönder</button></form>'));
app.post('/', async (request, response) => {
    const NotBot = await GoogleRecaptcha.verifyToken(request.body, request.clientIp);

    if (NotBot) {
        response.status(200).json({
            success: true,
            message: 'Tebrikler, robot değilsin! (opsiyonel)'
        });
    } else {
        response.status(403).json({
            success: false,
            message: 'Robot musun krdşm?'
        });
    }
});


console.log("\n\n");


(async () => {
    try {
        const Manager = new vinet.LicenseManager("uygulama_id", "uygulama_secret");
        console.log("Lisans yöneticisi oluşturuldu.");

        Manager.setProduct("urun_id");
        console.log("Ürün ID'si ayarlandı:", "urun_id");

        Manager.setLicense("lisans_anahtari");
        console.log("Lisans anahtarı ayarlandı:", "lisans_anahtari");

        const result = await Manager.checkLicense();
        console.log("Lisans kontrolü sonucu:", result);

        if (result.success) {
            console.log("Lisans kontrolü başarılı!", result);
        } else {
            console.log("Lisans kontrolü başarısız!", result.message);
        }

        const application = await Manager.getApplication();
        console.log("Uygulama bilgileri alma sonucu:", application);

        if (application.success) {
            console.log("Uygulama Bilgileri:", application);
        } else {
            console.log("Uygulama bilgileri alınırken hata oluştu:", application.message);
        }

        const product = await Manager.getProduct();
        console.log("Ürün bilgileri alma sonucu:", product);

        if (product.success) {
            console.log("Ürün Bilgileri:", product);
        } else {
            console.log("Ürün bilgileri alınırken hata oluştu:", product.message);
        }
    } catch (error) {
        console.error("Bir hata oluştu:", error.message);
    }
})();
