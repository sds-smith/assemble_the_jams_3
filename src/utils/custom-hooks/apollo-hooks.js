import { useLazyQuery, useMutation } from "@apollo/client";
import { searchResultsQuery, likeStatusQuery } from "../graphql/queries";
import { toggleLikeMutation, savePlaylistMutation } from "../graphql/mutations";

export function usePlaylist() {
    const [search, searchResponse] = useLazyQuery(searchResultsQuery);
    const [save, saveResponse] = useMutation(savePlaylistMutation);

    const searchResults = async (searchString) => {
        const { data } = await search({ 
          query: searchResultsQuery,
          variables: { searchString }
        });
        return data.search;
    };

    const savePlaylist = async ({ playlistName, trackURIs }) => {
        const { data } = await save({
          variables: {
            input: { playlistName, trackURIs }
          },
          update: (cache, { data }) => {
            const { savePlaylistResponse } = data;
            cache.writeQuery({
              query: searchResultsQuery,
              variables: { searchString: savePlaylistResponse.message },
              data: {
                search: savePlaylistResponse
              }
            })
          }
        });
        return data.savePlaylistResponse
      };

    return { 
        searchResults, 
        searchLoading: searchResponse.loading, 
        searchError: searchResponse.error,
        savePlaylist,
        saveLoading: saveResponse.loading,
        saveError: saveResponse.error 
    };
};

export function useLike() {
    const [getLike, likeResponse] = useLazyQuery(likeStatusQuery);
    const [toggle, toggleResponse] = useMutation(toggleLikeMutation);

    const likeStatus = async (trackId) => {
        const { data } = await getLike({
          query: likeStatusQuery,
          variables: { trackId }
        });
        return data.likeStatus;
    };

    const toggleLike = async ({ trackId, isLike }) => {
        const { data } = await toggle({
          variables: {
            input: { trackId, isLike}
          }
        });
        return data.toggleResponse;
    };

    return { 
        likeStatus, 
        likeStatusLoading: likeResponse.loading, 
        likeStatusError: likeResponse.error,
        toggleLike,
        toggleLikeLoading: toggleResponse.loading,
        toggleLikeError: toggleResponse.error 
    };
};