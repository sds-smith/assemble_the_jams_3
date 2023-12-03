import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { PlayerContext } from "../../contexts/player.context";
import { httpToken } from "../http.requests";
import { nowPlayingInitialState } from "../types/player.types";

export const useAudio = () => {
    const audioRef = useRef();
    const spotifyRef = useRef();

    const {
        nowPlaying, 
        setNowPlaying,
        active, 
        setActive
    } = useContext(PlayerContext);

    const [activeElement, setActiveElement] = useState({
        audio: false,
        spotify: false
    });
    const [deviceId, setDeviceId] = useState('');
    const [spotifyPlayerLoading, setSpotifyPlayerLoading] = useState(false);
    const [browserBlocked, setBrowserBlocked] = useState(false);

    const loadSpotifyPlayer = () => {
        setSpotifyPlayerLoading(true)
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {            
            spotifyRef.current = new window.Spotify.Player({
                name: 'Assemble the Jams',
                getOAuthToken: async cb => { cb((await httpToken()).accessToken); },
                volume: 0.5
            });         
            const player = spotifyRef.current;   

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setSpotifyPlayerLoading(false)
                setDeviceId(device_id);
            });
        
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('autoplay_failed', () => {
                console.log('Autoplay is not allowed by the browser autoplay rules');                
                setBrowserBlocked(true)
              });
        
            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
                player.getCurrentState().then( (state) => { 
                    if (state) {
                        if ((state.paused) && (state.position >= 30000) && (state.position < 30100)) {
                            console.log('browser paused, resume')
                            player.resume()
                        } else if (state.paused) {
                            console.log('user paused, setting active false')
                            setActive(false)
                        } else {
                            if (!active) {
                                console.log('track loaded in sdk, setting active true')
                                setActive(true)
                            }
                        }
                    } else {
                        console.log('no player state, setting active false')
                        active && setActive(false)
                    }
                });
            }));
            player.connect();

            player.on('playback_error', ({ message }) => {
                console.error('Failed to perform playback', message);
              });
        };            
    };

    const spotifyPlay = (id, {
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken
          }
        }
    }) => {
        getOAuthToken(async (access_token) => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri], position_ms: 30000 }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access_token}`
                },
            });
        });
    };

    const playTrack = async () => {
        const playerState = await spotifyRef.current.getCurrentState();
        if (!playerState || playerState?.position === 0 || playerState?.paused) {
            const uri = `spotify:track:${nowPlaying.track.id}`;
            spotifyPlay(deviceId, {
                spotify_uri: uri,
                playerInstance: spotifyRef.current
            });
        };
    };

    const stopPlayback = () => {
        const currentPlayer = spotifyRef.current;
        currentPlayer.pause();
        spotifyPlay(deviceId, {
            spotify_uri: '',
            playerInstance: currentPlayer
        });
    };

    useEffect(() => {
        if (activeElement.audio && !audioRef.current) {
            audioRef.current = new Audio();
            const audioPreview = audioRef.current;
            audioPreview.volume = 0.5;
        } else {
            if (audioRef.current) audioRef.current.src = '';
        }
        if (activeElement.spotify) {
            loadSpotifyPlayer();
        } else {
            if (spotifyRef.current) spotifyRef.current.src = '';
        };
    }, [activeElement]);

    useEffect(() => {
        const audioPreview = audioRef.current;
        if (nowPlaying.hasTrack()) {
            if (activeElement.audio) {
                audioPreview.src = nowPlaying.track.preview;
                audioPreview.load();
                setActive(true);
                audioPreview.play();
                audioPreview.onended = () => {
                    audioPreview.src = ''
                    setActive(false);
                    setNowPlaying(nowPlayingInitialState);
                };
            } else if (activeElement.spotify) {
                (async () => {await playTrack()})();
            }
        } else {
            if (activeElement.audio) {
                audioPreview.src = ''
            } else if (activeElement.spotify) {
                stopPlayback();
            }
        }
    }, [nowPlaying]);

    const audioPlayer =  useCallback(() => {
        setActiveElement({
            audio: true,
            spotify: false
        });
    },[]);

    const spotifyPlayer = useCallback(() => {
        setActiveElement({
            audio: false,
            spotify: true
        });
    },[]);

    return { audioPlayer, spotifyPlayer };
};