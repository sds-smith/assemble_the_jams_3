import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { PlayerContext } from "../../contexts/player.context";
import { httpToken } from "../http.requests";

export const useAudio = () => {
    const audioRef = useRef();

    const {
        nowPlaying, 
        setNowPlaying, 
        active, 
        setActive, 
        setCurrentPlayer, 
        setSpotifyPlayerLoading, 
        setDeviceId, 
        setBrowserBlocked
    } = useContext(PlayerContext);

    const [activeElement, setActiveElement] = useState({
        audio: false,
        spotify: false
    });

    const loadSpotifyPlayer = () => {
        setSpotifyPlayerLoading(true)
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {            
            const player = new window.Spotify.Player({
                name: 'Assemble the Jams',
                getOAuthToken: async cb => { cb((await httpToken()).accessToken); },
                volume: 0.5
            });            
            setCurrentPlayer(player)

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

    useEffect(() => {
        if (activeElement.audio) {
            audioRef.current = new Audio();
            const audioPreview = audioRef.current;
            audioPreview.volume = 0.5;
        } else {
            audioRef.current = undefined;
        }
        if (activeElement.spotify) {
            loadSpotifyPlayer();
        };
    }, [activeElement]);

    useEffect(() => {
        const audioPreview = audioRef.current;
        if (nowPlaying?.hasTrack && audioPreview) {
            audioPreview.src = nowPlaying.track.preview;
            audioPreview.load();
            setActive(true);
            audioPreview.play();
            audioPreview.onended = () => {
                setActive(false);
                setNowPlaying(null);
            };
        } else {
            if (audioPreview) audioPreview.src = '';
            setActive(false);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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