const crypto = require("crypto");
const util = require('util');

const scrypt = util.promisify(crypto.scrypt)

//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

const signupSecret = process.env.SIGNUPSECRET;

const encrypt = async (password) => {

    const salt = crypto.randomBytes(8).toString('hex');
    const hashed = await scrypt(password, salt, 64);
    const record = {
        // iv: iv.toString('hex'),
        // password: encryptedPassword.toString('hex'),
        password: hashed.toString('hex') + "." + salt
    }

    // const iv = Buffer.from(crypto.randomBytes(16));
    // const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(signupSecret), iv);

    // const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return record;
}

const decrypt = async (savedhash, password) => {

    const result = saved. split('.');
    const hashed = result[0];
    const salt = result[1];

    const hashedSupplied = await scrypt(savedhash, salt, 64);

    return hashed === hashedSupplied.toString('hex');


    // const decipher =  crypto.createCipheriv("aes-256-ctr", Buffer.from(signupSecret), iv);
    // Buffer.from(encryption.iv, 'hex');

    // const decryptedPassword = Buffer.concat([cipher.update(Buffer.from(encryption.password, 'hex')), cipher.final()]);

    // return decryptedPassword.toString();
}

module.exports = {encrypt, decrypt};