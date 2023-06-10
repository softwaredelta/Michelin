const API_KEY = process.env.GOOGLE_API_KEY
const axios = require('axios')

exports.getRatingFromAPI = async (sp) => {
  const addressAPIString = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${sp.address}&inputtype=textquery&fields=rating&key=${API_KEY}`
  const nameAPIString = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${sp.name}&inputtype=textquery&fields=rating&key=${API_KEY}`

  let newRating = sp.rating
  try { // Check for errors in Google API Call
    let response = await axios.get(addressAPIString)
    let apiRating = response.data.candidates[0].rating

    // If search by address can't be found, try by sp name
    if (typeof apiRating === 'undefined') {
      response = await axios.get(nameAPIString)
      apiRating = response.data.candidates[0].rating
    }

    // Assign if new rating was found
    newRating = (typeof apiRating === 'undefined') ? newRating : apiRating
  } catch (err) {
    console.log(err)
  }

  return newRating
}
