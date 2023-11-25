import { TrackType } from './track.types';
import { NowPlaying } from './player.types'; 
import { CurrentUserType } from './user.types'

type GetClientToken = () => Promise<{token: string, expires_in: number} | undefined>
type Auth = (codeChallenge: string, state: string) => void
type RefreshUserToken = (refreshToken: string, authSession: string) => Promise<{access_token: string, expires_in: number, expires_at: number, refresh_token: string} | undefined>
type ReturnUserAccessToken = (authSession: string) => Promise<string>
type GetUserProfile = (authSession: string) => Promise<{display_name: string, image_url: string, id: string} | undefined>
type Search = (clientToken: string, query: string) => Promise<{searchResultsArray: TrackType[], recommendationsArray: TrackType[]} | undefined>
type TransferPlayback = (id: string, access_token: string) => Promise<void>
// type PlayTrack = (id: string, uri: string, currentPlayer: Spotify.Player) => void
type StopPlayback = (id: string) => Promise<void>
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

export type Play = ( id: string, secondParam: SecondParamType) => void

export type SpotifyType = {
  transferPlayback: TransferPlayback;
  // playTrack: PlayTrack;
  stopPlayback: StopPlayback;
}