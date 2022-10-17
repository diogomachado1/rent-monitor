const axios = require('axios');

const urls = process.env.DISCORD_URL


async function sendMensages(type, disponibilty, data) {
  await axios.post(urls, {
    "content": `${disponibilty===true?':green_circle::green_circle::green_circle::green_circle:':':red_circle::red_circle::red_circle::red_circle:'}
@here Este imovel ${disponibilty===true? 'esta': 'não esta mais'} ${type==='buy'? 'à venda': 'para alugar'} 
link: https://www.paulofrancoimoveis.com.br${data.site_url}
titulo: ${data.site_title}
valor: ${type==='buy'? data.sale_value: data.rental_value }
Bairro: ${data.neighborhood}
Code: ${data.code}
Quartos: ${data.bedroom}
Banheiros: ${data.bathroom}
Foto: ${data.cover_photo.url}
    ` 
  })
}
   
module.exports = {sendMensages} 
                  