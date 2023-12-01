import { GraphQLError } from 'graphql';
import {
    search,
    savePlaylist,
    getLikeStatus,
    toggleLike
} from '../models/spotify.model.js';

const spotifyResolvers = {
    Query: {
        // second argument is args, third argument is context
        search: async (_root, { searchString }, { token }) => {
            const {
                status,
                message,
                searchResultsArray,
                recommendationsArray
            } = await search({searchString, token});
            return { 
                message,
                searchResultsArray, 
                recommendationsArray,
                playlistName: ''
            }
        },
        likeStatus: async (_root, { trackId }, { accessToken }) => {
            const { likeStatus, message } = await getLikeStatus({trackId, accessToken});
            return likeStatus;
        },
    },

    Mutation: {
        savePlaylist: async (_root, { input: { playlistName, trackURIs } }, { id, accessToken }) => {
            const {
                status,
                message,
                playlist_name,
                searchResultsArray,
                recommendationsArray
            } = await savePlaylist({ id, accessToken, playlistName, trackURIs });
            return { 
                message,
                searchResultsArray,
                recommendationsArray,
                playlistName: playlist_name
            };
        },
        toggleLike: async (_root, {input: { trackId, isLike } }, { accessToken }) => {
            const toggleResponse = await toggleLike({ trackId, isLike, accessToken });
            return toggleResponse;
        }
    }
};

export { spotifyResolvers };