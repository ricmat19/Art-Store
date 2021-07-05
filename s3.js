import AWS from 'aws-sdk';

const region = "";
const bucketName = "";
const accessKeyId = "";
const secretAccessKey = "";

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: '4'
})