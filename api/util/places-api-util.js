const API_KEY = process.env.GOOGLE_API_KEY
const axios = require('axios');

exports.getRatingFromAPI = async (spAddress) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${spAddress}&inputtype=textquery&fields=rating&key=${API_KEY}`)

    return response.data.candidates[0].rating
}