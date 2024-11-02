<h1 align="center">
  Vi Services 👋
</h1>

<p>
  <a href="https://www.npmjs.com/package/vinet" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/vinet.svg">
  </a>
  <a href="https://github.com/ardareaa/vinet#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> **Vi Services** geliştiricileri için hazırlanan module hoşgeldin.

### 🏠 [Github Docs](https://github.com/ardareaa/vinet#readme)

## Kurulum

```sh
npm install vinet@latest
```

## Test

```sh
npm run test
```

<div id="usage">

# Tanımlama

```javascript
const vinet = require('vinet');
```

# Cihaz Serial
```javascript
// Cihaz seri numarası
const originalHwid = vinet.DeviceSerial(true);
console.log(originalHwid);
// -> d3c3d6a6-100a-4ebd-bf79-f3a9e1a9a0e1

// Cihaz seri numarası şifrelenmiş (sha-256 hash)
const hashHwid = vinet.DeviceSerial(false);
console.log(hashHwid);
// -> 970g8a65y62vfr13094b0de25131155fc69d76f8c8dc1538ee22d7862378d05a
```

# Rastgele Id
```javascript
// Küçük harf, büyük harf ve sayı
let id = vinet.makeId(20);
console.log(id);
// -> "n3oF2wS6nS35PNFbfLEw"

// Sadece küçük harf ve sayı
id = vinet.makeId(20, { lower: true, number: true });
console.log(id);
// -> "awlm7fnjv4pu8ws0gpwr"

// Sadece "1234" ile oluşturur
id = vinet.makeId(20, "1234");
console.log(id);
// -> "23113311443232314242"

// Sadece "abcdef" ve "012345" ile oluşturulur
id = vinet.makeId(20, "id");
console.log(id);
// -> "020ced3f322c50f1fa5a"
```


# Rastgele Sayı
```javascript
// 0 ile 5 arasında rastgele sayı
const Rn0v5 = vinet.random(0, 5);
console.log(Rn0v5);
// -> 5

// 5 ile 50 arasında rastgele sayı
const Rn5v50 = vinet.random(5, 50); 
console.log(Rn5v50);
// -> 18

// 2000 ile 2050 arasında rastgele sayı
const Rn2000v2050 = vinet.random(2000, 2050);
console.log(Rn2000v2050);
// -> 2008
```

# Düzenlenmiş Versiyon
```javascript
// Boş bırakılırsa vinet modul sürümü (1.0.3-beta.1.0.2)
const VinetVersion = vinet.versionString();
console.log(VinetVersion);
// -> 1.0.3 - Beta 1.0.2

let version = vinet.versionString("3.0.1");
console.log(version);
// -> 3.0.1

version = vinet.versionString("3.0.1-beta.1.0");
console.log(version);
// -> 3.0.1 Beta 1.0

version = vinet.versionString("3.0.1-alpha.1.0");
console.log(version);
// -> 3.0.1 Alpha 1.0
```

# Tarih Fonksiyonu
```javascript
// Şuanki tarih
let tarih = vinet.getDate();
console.log(tarih);
// -> "20 Ekim, 2024 10:20"

// Belirli bir tarih
tarih = vinet.getDate(new Date("Oct 20, 2003 10:20"))
console.log(tarih);
// -> "20 Ekim, 2003 10:20"

// Özel Format ile şuanki tarih
tarih = vinet.getDate(null, "DD MMM YYYY");
console.log(tarih);
// -> "20 Ekim 2024"

// Özel Format ile belirli bir tarih
tarih = vinet.getDate(new Date("Oct 20, 2003 10:20"), "DD MMM YYYY");
console.log(tarih);
// -> "20 Ekim 2003"
```

# Google Robot Doğrulaması
```javascript
const GoogleRecaptcha = new vinet.ReCaptcha.Google("Google-Recaptcha-Secret");

app.post('/action', async (request, response) => {
    // Token request.body gönderilirse "g-recaptcha-response" veya "token" verisini alır veya direkt doğrulama tokeni gönderilir.
    // Ip adresi zorunlu değil, "request-ip" modülü kullanabilirsiniz.
    const NotBot = await GoogleRecaptcha.verifyToken(request.body, request.clientIp);

    if (NotBot) {
        res.status(200).json({
            success: true,
            message: 'Tebrikler, robot değilsin! (opsiyonel)'
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'Robot musun krdşm?'
        });
    }
});
```

# Lisans Kontrolü
```javascript
(async () => {
    try {
        const Manager = new vinet.LicenseManager("uygulama_id", "uygulama_secret");

        Manager.setProduct("urun_id");
        Manager.setLicense("lisans_anahtari");

        const result = await Manager.checkLicense();
        if (result.success) {
            console.log("Lisans kontrolü başarılı!", result);
        } else {
            console.log("Lisans kontrolü başarısız!", result.message);
        }

        const application = await Manager.getApplication();
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
```
</div>

## Geliştirici

👤 **Vi Services - @ardareaa**

* Website: https://viii.net.tr/
* Github: [@ardareaa](https://github.com/ardareaa)

## 🤝 Katkıda bulun

Katkılar ve özellik istekleri memnuniyetle karşılanır!<br />[Sorunlar sayfasını](https://github.com/ardareaa/vinet/issues) kontrol edebilirsiniz.

## Desteğinizi gösterin

` Vi Services ` projeleri size yardımcı olduysa bir ⭐️ verin!

## 📝 License

Copyright © 2024 [ardareaa](https://github.com/ardareaa).<br />
Bu proje [MIT](https://github.com/ardareaa/vinet/blob/master/LICENSE) lisanslıdır.

***
_Bu README, ❤️ ile [readme-md-generator](https://github.com/kefranabg/readme-md-generator) tarafından oluşturuldu._