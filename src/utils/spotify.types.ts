import { TrackType } from '../store/track/track.types';
import { CurrentUserType, NowPlaying } from './context.utils'

// {
//   "tracks": {
//     "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n",
//     "items": [
//       {}
//     ],
//     "limit": 20,
//     "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
//     "offset": 0,
//     "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
//     "total": 4
//   },
// }

type GetClientToken = () => Promise<{token: string, expiresIn: number} | undefined>
type Auth = (codeChallenge: string, state: string) => void
type GetUserProfile = (authSession: string) => Promise<{display_name: string, image_url: string, id: string} | undefined>
type Search = (clientToken: string, query: string) => Promise<{searchResultsArray: TrackType[], recommendationsArray: TrackType[]} | undefined>
type PlayTrack = (id: string, uri: string, currentPlayer: Spotify.Player) => void
type GetLikeStatus = (authSession: string, trackId: string) => Promise<boolean>
type SaveResponse = { 
  message: string;
  playlistName: string;
  playlistTracks: TrackType[];
  searchResults: TrackType[];
}
type SavePlaylist = (authSession: string, currentUser: CurrentUserType, playlistName: string, trackURIs: string[]) => Promise<SaveResponse>
type ToggleLike = (authSession: string, nowPlaying: NowPlaying) => Promise<{message: string, isLike: boolean}>

export type RecommendationsResponseType = {
  tracks: SpotifyApi.TrackObjectFull[]
  seeds: SpotifyApi.RecommendationsSeedObject[]
}

export type GetOAuthToken = (callback: (t: string) => void) => {callback(access_token: string): void};

export type SecondParamType = {
  spotify_uri: string;
  playerInstance: Spotify.Player
}

export type Play = (id: string, secondParam: SecondParamType) => void

export type SpotifyType = {
  getClientToken: GetClientToken;
  auth: Auth;
  getUserProfile: GetUserProfile;
  search: Search;
  playTrack: PlayTrack;
  getLikeStatus: GetLikeStatus;
  savePlaylist: SavePlaylist;
  toggleLike: ToggleLike;

}