// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the AWS region
AWS.config.update({ region: 'ca-central-1' });

// Set up the S3 client
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// If you prefer to use hardcoded credentials, use the following (not recommended for production):
AWS.config.update({
  accessKeyId: 'AKIAZTZAZ6TVJVZUANSF',
  secretAccessKey: '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'
});

module.exports = s3;
