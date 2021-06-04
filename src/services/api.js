const axios = require('axios')
const key = `chave-da-api-bitly`

const api = axios.create({
    baseURL: `https://api-ssl.bitly.com/v4`,
    headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
    },
})

module.exports = api