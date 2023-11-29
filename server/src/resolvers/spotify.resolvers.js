import { GraphQLError } from 'graphql';
import {
    search,
    savePlaylist,
    getLikeStatus,
    toggleLike
} from '../models/spotify.model.js';

const spotifyResolvers = {
    Query: {
        greeting: () => 'Hello from Spotify Resolvers!',
        greetingWPayload: (_root, {payload}) => `Hello ${payload}`,
        search: async (_root, { searchString }, context) => {
            const { token } = context;
            console.log({token})
            const {
                status,
                message,
                searchResultsArray,
                recommendationsArray
            } = await search({searchString, token});
            console.log({ searchResultsArray, recommendationsArray })
            return { searchResultsArray, recommendationsArray }
        },
        likeStatus: async (_root, {trackId}, {user}) => {
            const { accessToken } = user;
            const { likeStatus } = await getLikeStatus({trackId, accessToken});
            return {
                status: likeStatus
            };
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