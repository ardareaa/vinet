const fetch = require("node-fetch");

/**
 * GoogleReCaptcha sınıfı, Google ReCAPTCHA doğrulamasını yapmak için kullanılır.
 */
class GoogleReCaptcha {
  /**
   * GoogleReCaptcha sınıfını başlatır.
   * @param {string} secret - Google ReCAPTCHA gizli anahtarı.
   */
  constructor(secret) {
    this.secret = secret;
  }

  /**
   * ReCAPTCHA doğrulama jetonunu doğrular.
   * @param {string|object} token - Doğrulama jetonu. Eğer bir nesne verilirse, "g-recaptcha-response" veya "token" özelliğini alır.
   * @param {string} [ip] - (Opsiyonel) Kullanıcının IP adresi.
   * @returns {Promise<boolean>} Jeton geçerli ise true, aksi halde false döner.
   */
  async verifyToken(token, ip) {
    const tokenValue = typeof token === "object" ? token["g-recaptcha-response"] || token["token"] : token;

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${this.secret}&response=${tokenValue}${ip ? `&remoteip=${ip}` : ""}`;

    try {
      const response = await fetch(verificationURL);
      const body = await response.json();
      return body.success || false;
    } catch (error) {
      console.error("ReCAPTCHA doğrulama hatası:", error);
      return false;
    }
  }
}

module.exports = {
  /**
   * GoogleReCaptcha sınıfı, Google ReCAPTCHA doğrulamasını yapmak için kullanılır.
   */
  Google: GoogleReCaptcha,
};