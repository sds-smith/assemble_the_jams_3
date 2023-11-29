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
            return { searchResultsArray, recommendationsArray }
        },
        likeStatus: async (_root, { trackId }, { accessToken }) => {
            const { likeStatus } = await getLikeStatus({trackId, accessToken});
            return likeStatus;
        },
    },

    // Mutation: {
    //     savePlaylist: async (_root, payload, context) => {
    //         const saveResponse = await savePlaylist();
    //         return saveResponse;
    //     },
    //     toggleLike: async (_root, payload, context) => {
    //         const toggleResponse = await toggleLike();
    //         return toggleResponse;
    //     }
    // }
};

export { spotifyResolvers }