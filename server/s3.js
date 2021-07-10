const AWS = require ('aws-sdk');
const crypto = require('crypto');
const {promisify} = require('util');
const randomBytes = promisify(crypto.randomBytes);


//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

const region = process.env.S3REGION;
const bucketName = process.env.S3NAME;
const accessKeyId = process.env.S3KEY;
const secretAccessKey = process.env.S3SECRETKEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL(){

    const rawBytes = await randomBytes(16);
    const imageName= rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}

module.exports = generateUploadURL();
