import { useContext } from "react"
import Button from "../../reusable-components/button/button.component"
import Spinner from "../../reusable-components/spinner/spinner.component"
import { PlayerContext } from "../../../contexts/player.context"
import { ActivateContainer, ButtonContainer, TextDiv } from "./activate.styles"

const Activate = () => {
    const { currentPlayer, setBrowserBlocked } = useContext(PlayerContext)

    const activate = async () => {
        if (currentPlayer) {
            await currentPlayer.activateElement()
            await currentPlayer.resume()
            setBrowserBlocked(false)
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