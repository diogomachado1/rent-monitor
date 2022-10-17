'use strict';

const { rentMonitor } = require('./src/rent-monitor');

module.exports.run = async (test, test2)=>{
  console.log(test2)
  await Promise.all([
    rentMonitor('buy'),
    rentMonitor('rent')
  ])
}