const crypto = require("crypto");

//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

const signupSecret = process.env.SIGNUPSECRET;

const encrypt = (password) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(signupSecret), iv);

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        password: encryptedPassword.toString('hex')
    }
}

const decrypt = (encryption) => {
    const decipher =  crypto.createCipheriv("aes-256-ctr", Buffer.from(signupSecret), iv);
    Buffer.from(encryption.iv, 'hex');

    const decryptedPassword = Buffer.concat([cipher.update(Buffer.from(encryption.password, 'hex')), cipher.final()]);

    return decryptedPassword.toString();
}

module.exports = {encrypt, decrypt};