import { createContext, useState } from "react";

export const TrackContext = createContext({
    searchResults : null, 
    setSearchResults : () => null,
    playlistTracks : null, 
    setPlaylistTracks : () => null,
    recommendations : null, 
    setRecommendations : () => null,
    playlistName : null, 
    setPlaylistName : () => null,
    searchLoading : null, 
    setSearchLoading : () => null
})

export const TrackProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([])
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [playlistName, setPlaylistName] = useState("Name Your New Playlist")
    const [searchLoading, setSearchLoading] = useState(false)
    
    const value = {
                    searchResults, 
                    setSearchResults,
                    playlistTracks, 
                    setPlaylistTracks,
                    recommendations, 
                    setRecommendations,
                    playlistName, 
                    setPlaylistName,
                    searchLoading, 
                    setSearchLoading
                }

    return <TrackContext.Provider value={value} >{children}</TrackContext.Provider>
}