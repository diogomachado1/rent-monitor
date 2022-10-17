const { getProperties } = require("./getProperties");
const { getSavedProperties } = require("./getSavedProperties");
const { savePropertiesOnS3 } = require("./savePropertiesOnS3");
const { sendMensages } = require("./sendMensages");

async function rentMonitor(type) {
  const [savedProperties, currentProperties] = await Promise.all([
    getSavedProperties(type), 
    getProperties(type)
  ])
  const newProperties = currentProperties.reduce((acc, item)=> savedProperties.find((saved)=> saved.db_id===item.db_id)? acc : [item,...acc],[])
  const outProperties = savedProperties.reduce((acc, item)=> currentProperties.find((saved)=> saved.db_id===item.db_id)? acc : [item,...acc],[])

  await Promise.all(newProperties.map((item)=> sendMensages(type, true ,item)))
  await Promise.all(outProperties.map((item)=> sendMensages(type, false ,item))) 
  await savePropertiesOnS3(currentProperties, type)  
  console.log(`New Properties: ${newProperties.length} and out Properties: ${outProperties.length}`)
}

module.exports = {rentMonitor}