import { useState, useContext, FC, ButtonHTMLAttributes, ImgHTMLAttributes, Dispatch, SetStateAction } from "react"
import { ResponsiveContext } from "../../../contexts/responsive.context"
import { PlayerContext } from "../../../contexts/player.context"
import { useTrackControls } from "../../../utils/custom-hooks/use-track-controls"
import { TrackAction } from "./track-action-button.styles"

import PlayBtn from '../../../assets/icons/play_white24.png'
import StopBtnWhite from '../../../assets/icons/stop_white24.png'
import StopBtnBlack from '../../../assets/icons/stop_black24.png'
import AddBtnWhite from '../../../assets/icons/add_white24.png'
import AddBtnBlack from '../../../assets/icons/add_black24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'
import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { TrackType } from '../../../store/track/track.types'

type TrackActionButtonProps = {
    buttonType: TRACK_ACTION_BUTTON_CLASSES.PLAY | 
                TRACK_ACTION_BUTTON_CLASSES.STOP_WHITE | 
                TRACK_ACTION_BUTTON_CLASSES.STOP_BLACK | 
                TRACK_ACTION_BUTTON_CLASSES.ADD_WHITE | 
                TRACK_ACTION_BUTTON_CLASSES.ADD_BLACK | 
                TRACK_ACTION_BUTTON_CLASSES.REMOVE |
                TRACK_ACTION_BUTTON_CLASSES.LIKE |
                TRACK_ACTION_BUTTON_CLASSES.UNLIKE; 
    track: TrackType;
    setMessage?: Dispatch<SetStateAction<string>>;
} & ButtonHTMLAttributes<HTMLButtonElement> 
  & ImgHTMLAttributes<HTMLImageElement>

export enum TRACK_ACTION_BUTTON_CLASSES {
    PLAY = 'PLAY',
    STOP_WHITE = 'STOP_WHITE',
    STOP_BLACK = 'STOP_BLACK',
    ADD_WHITE = 'ADD_WHITE',
    ADD_BLACK = 'ADD_BLACK',
    REMOVE = 'REMOVE',
    LIKE = 'LIKE',
    UNLIKE = 'UNLIKE'
}

const TrackActionButton: FC<TrackActionButtonProps> = ({buttonType, track, setMessage}) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const { isMobile } = useContext(ResponsiveContext)
    const { spotifyPlayerLoading, currentPlayer } = useContext(PlayerContext)
    const { addTrack, removeTrack, toggleLike, play, stopPlayback } = useTrackControls(track)

    const playTrack = async () => {
        currentPlayer && await currentPlayer.activateElement()
        const playMessage = await play()
        setMessage!(playMessage)
        window.setTimeout(() => {
          setMessage!('')
        }, 3000)
    }

    const LikeAction = async () => {
        const message = await toggleLike()
        setMessage!(message)
        setTimeout(() => setMessage!(''), 3000);
    }

    const add = async () => {
        const message = await addTrack()
        setMessage!(message)
        window.setTimeout(() => setMessage!(''), 3000);
    }

    const TRACK_ACTION_BUTTON = {
        PLAY : { 
            onClick : playTrack,
            src : PlayBtn, 
            alt : 'button to play track',
        },
        STOP_WHITE : {
            onClick : stopPlayback,
            src : StopBtnWhite,
            alt : 'button to stop track playback'
        },
        STOP_BLACK : {
            onClick : stopPlayback,
            src : StopBtnBlack,
            alt : 'button to stop track playback'
        },
        ADD_WHITE : { 
            onClick : addTrack, 
            src : AddBtnWhite, 
            alt : 'button to add track to playlist' 
        },
        ADD_BLACK : { 
            onClick : add, 
            src : AddBtnBlack, 
            alt : 'button to add track to playlist' 
        },
        REMOVE : { 
            onClick : removeTrack,
            src : ClearBtn, 
            alt : 'button to remove track from playlist' 
        },
        LIKE : { 
            onClick : LikeAction,
            src : Like, 
            alt : 'button to add song to liked songs'  
        },
        UNLIKE : { 
            onClick : LikeAction,
            src : Unlike, 
            alt : 'button to remove song from liked songs'  
        },
    }
    
    const click = () => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 600)
        TRACK_ACTION_BUTTON[buttonType].onClick()
    }

    return (
        <TrackAction 
            onClick={click}
            disabled={spotifyPlayerLoading}
            isMobile={isMobile}
            clicked={clicked}
        >
            <img src={TRACK_ACTION_BUTTON[buttonType].src} alt={TRACK_ACTION_BUTTON[buttonType].alt}/>
        </TrackAction>
    )
}



export default TrackActionButton