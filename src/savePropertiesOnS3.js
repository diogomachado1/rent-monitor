const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

async function savePropertiesOnS3(data, type) {
  await s3.putObject({
    Bucket: 'rent-monitor-db',
    Key: `rent-monitor-db-${type}.json`,
    Body: JSON.stringify(data),
    ContentType: "application/json"},
    function (err,data) {
      console.log(JSON.stringify(err) + " " + JSON.stringify(data));
    }
  );
}

module.exports = {savePropertiesOnS3} 