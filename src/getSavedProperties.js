const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

async function getSavedProperties(type) {
  const {Body} = await s3.getObject({Bucket: 'rent-monitor-db', Key:`rent-monitor-db-${type}.json`}).promise();
   return JSON.parse(Body.toString()) 
}

module.exports = {getSavedProperties} 