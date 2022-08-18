import axios from 'axios';

export const LastFM = {

    async search(searchTerm) {
        try {
            
            const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerm}&api_key=66c1bfb2c9a5cf8157f8856e53672238&format=json`)
            const searchResults = response.data

            const searchResultsArray = searchResults.results.trackmatches.track.map(track => ({
                id : track.mbid,
                name : track.name,
                artist : track.artist,
                album : '',
                cover : track.image[0]['#text'],
                uri : track.url
              }))

            const {name, artist} = searchResultsArray[0]
            const recommendationsResponse = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${name}&api_key=66c1bfb2c9a5cf8157f8856e53672238&format=json`)
            const recommendations = recommendationsResponse.data
            const recommendationsArray = recommendations.similartracks.track.map(track => ({
                id : track.mbid,
                name : track.name,
                artist : track.artist.name,
                album : '',
                cover : track.image[0]['#text'],
                uri : track.url
              }))
            return {searchResultsArray, recommendationsArray}
        } catch(error) {
            console.log('error with search', error)
        }
    },
}