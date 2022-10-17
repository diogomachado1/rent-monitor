const { rentMonitor } = require("./rent-monitor");

async function main() {
  await Promise.all([
    rentMonitor('buy'),
    rentMonitor('rent')
  ])
}

main().then((data) => console.log('aa'))  