const request = require('request')

const geocode = (address, callback) => {
    const token = 'pk.eyJ1Ijoid2hhdGV2ZXJ1c2VybmFtZSIsImEiOiJjangzcW1xdDcwMW9tNDlwY296andjNzYzIn0.0g0n7F7EhZ5goKpqyWylQA'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+token+'&limit=1'
    console.log('getting geocode at ',url)
    request({ url, json: true }, (error, {body} = {}) => {
        // console.log('what came through',body)
        // const {features} = body;
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode