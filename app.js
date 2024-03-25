import CryptoJS from 'crypto-js';

const keySize = 256;
const iterations = 100;

// data to be filled
const passwordEncryptedTerraKey = "eyJuYW1lIjoiSGFyc2hhZHZhbGExMCIsImFkZHJlc3MiOiJ0ZXJyYTE0OHVjdGQ2eGFxNHJ2cGRydzZjZ2U0ZWNuOWtmY3J2cmdtY2d4dCIsImVuY3J5cHRlZF9rZXkiOiIwZjk5OGY0MTJjZWVjODRkYWE2NTc2NDRkNDNjZWUzZDhhNjc0MTM1NDUyZGZhZmJlMTUwYzA3OGFmZjQ4YWY5WjZNc1FXVzZYcFQyWVNBOGZHZU5MRkg0Y2dOSmxLMTRzUk4rRytydzRVYXNJRlNGWFN2OGZpTzl2dzUxc013dkE3NTM0M0NhSVJkOU5Xcm90eVVMdU5Jb25FUDk2aFdXekJDenJ2bDhoems9In0=";
const password = "Vala1010##";

const decrypt = (terraPrivateKey, password) => {
  try {
    console.log("started decrypting");

    const salt = CryptoJS.enc.Hex.parse(terraPrivateKey.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(terraPrivateKey.substr(32, 32));
    const encrypted = terraPrivateKey.substring(64);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8);

    console.log("decrypting successful!");

    return decrypted;
  } catch (error) {
    console.log("error while decrypting:", error);

    throw ("error while decrypting:", error);
  }
}

try {
  const wrappedKey = JSON.parse(
    Buffer.from(
      passwordEncryptedTerraKey,
      "base64"
    ).toString("utf8")
  );
  const initialDecryptedTerraKey = decrypt(wrappedKey.encrypted_key, password);

  console.log("raw private key:", initialDecryptedTerraKey);
} catch (error) {
  console.log("error:", error);
}

