import { useSelector, useDispatch } from "react-redux"
import Button from "../../reusable-components/button/button.component"
import Spinner from "../../reusable-components/spinner/spinner.component"
import { selectCurrentPlayer } from "../../../store/player/player.selector"
import { setBrowserBlocked } from "../../../store/player/player.action"
import { ActivateContainer, ButtonContainer, TextDiv } from "./activate.styles"

const Activate = () => {
    const dispatch = useDispatch()
    const currentPlayer = useSelector(selectCurrentPlayer)

    const activate = async () => {
        if (currentPlayer) {
            await currentPlayer.activateElement()
            await currentPlayer.resume()
            dispatch(setBrowserBlocked(false))
        }
    }

    return (
        <ActivateContainer>
            { currentPlayer ?
                <ButtonContainer>
                    <TextDiv>Click to Activate</TextDiv>
                    <Button disabled={currentPlayer === null} onClick={activate} >ACTIVATE</Button>
                    <TextDiv>Spotify Connect Player</TextDiv>
                </ButtonContainer> :
                <Spinner loading={true} />
             }
        </ActivateContainer>
    )
}

export default Activate