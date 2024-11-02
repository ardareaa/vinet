const axios = require('axios');
const getDeviceSerial = require('../utils/DeviceSerial');

/**
 * LicenseManager sınıfı, lisans yönetimi için gerekli fonksiyonları sağlar.
 */
class LicenseManager {
    /**
     * LicenseManager sınıfını başlatır.
     * @param {string} appId - Uygulama kimliği.
     * @param {string} appSecret - Uygulama gizli anahtarı.
     */
    constructor(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.productId = null;
        this.licenseKey = null;
        this.deviceSerial = getDeviceSerial();
        this.url = 'https://lisans.viii.net.tr';
    }

    /**
     * Ürün ID'sini ayarlar.
     * @param {string} productId - Ayarlanacak ürün ID'si.
     */
    setProduct(productId) {
        this.productId = productId;
    }

    /**
     * Lisans anahtarını ayarlar.
     * @param {string} licenseKey - Ayarlanacak lisans anahtarı.
     */
    setLicense(licenseKey) {
        this.licenseKey = licenseKey;
    }

    /**
     * Lisansın geçerliliğini kontrol eder.
     * @returns {Promise<Object>} Lisans doğrulama sonucu.
     */
    async checkLicense() {
        if (!this.productId || !this.licenseKey) {
            return {
                success: false,
                message: 'Ürün id ve Lisans anahtarı ayarlanmalıdır!'
            };
        }

        try {
            const response = await axios({
                method: 'get',
                url: this.url + '/check',
                headers: {
                    'x-app': this.appId,
                    'x-verify': this.appSecret,
                    'x-product': this.productId,
                    'x-license': this.licenseKey,
                    'x-hwid': this.deviceSerial
                }
            });
            return response.data; // Doğrulama sonucunu döndürür
        } catch (error) {
            if (error.response) {
                return error.response.data; // Hata durumu için yanıt verilerini döndürür
            }

            return {
                success: false,
                message: error.message // Hata mesajını döndürür
            };
        }
    }

    /**
     * Uygulama bilgilerini alır.
     * @returns {Promise<Object>} Uygulama bilgileri.
     */
    async getApplication() {
        try {
            const response = await axios({
                method: 'get',
                url: this.url + '/application',
                headers: {
                    'x-app': this.appId,
                    'x-verify': this.appSecret
                }
            });
            return response.data.Application; // Uygulama bilgilerini döndürür
        } catch (error) {
            if (error.response) {
                return error.response.data; // Hata durumu için yanıt verilerini döndürür
            }

            return {
                success: false,
                message: error.message // Hata mesajını döndürür
            };
        }
    }

    /**
     * Ürün bilgilerini alır.
     * @returns {Promise<Object>} Ürün bilgileri.
     */
    async getProduct(productId = null) {
        if (!(this.productId || productId)) {
            return {
                success: false,
                message: 'Ürün id ayarlanmalıdır!'
            };
        }

        try {
            const response = await axios({
                method: 'get',
                url: this.url + '/product',
                headers: {
                    'x-app': this.appId,
                    'x-verify': this.appSecret,
                    'x-product': productId || this.productId
                }
            });
            return response.data.Product; // Ürün bilgilerini döndürür
        } catch (error) {
            if (error.response) {
                return error.response.data; // Hata durumu için yanıt verilerini döndürür
            }

            return {
                success: false,
                message: error.message // Hata mesajını döndürür
            };
        }
    }
}

module.exports = LicenseManager;