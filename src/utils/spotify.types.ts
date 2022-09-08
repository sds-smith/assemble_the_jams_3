import { Track } from '../store/track/track.types';

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

type GetClientToken = () => Promise<{token: string, expiresIn: string} | undefined>
type Auth = (codeChallenge: string, state: string) => void
type GetUserProfile = (authSession: string) => Promise<{display_name: string, image_url: string, id: string} | undefined>
type Search = (clientToken: string, query: string) => Promise<{searchResultsArray: Track[], recommendationsArray: Track[]} | undefined>

export type SpotifyType = {
  getClientToken: GetClientToken;
  auth: Auth;
  getUserProfile: GetUserProfile;
  search: Search;


}