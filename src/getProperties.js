const axios = require('axios');

const urls = 'https://api2.imobzi.app/v1/ac-spei2072dh2v/site2/properties/search?order=neighborhood&with_photos=true&show_map=true&with_listing_broker_count=true&search_type=properties'
const headers = {
  origin: 'https://www.paulofrancoimoveis.com.br'
}

async function getProperties(type) {
  const {data} = await axios.get(urls, {
    params: {
      page: 1,
      availability: type
    },
    headers
  })
  
  let allProperties = data.properties.properties
  if(data.properties.count >= 15){
    const totalPage = Math.ceil(data.properties.count/15)+1;
    const responses = await Promise.all([...Array(totalPage).keys()].slice(2,totalPage).map(async (page)=>{
      const pageResponse = await axios.get(urls, {
        params: {
          page,
          availability: type
        },
        headers
      }) 
      return pageResponse.data.properties.properties
    }))
    allProperties = allProperties.concat(responses.reduce((acc,current)=> acc.concat(current),[]))
  }

  return allProperties;
}
   
module.exports = {getProperties} 
                  