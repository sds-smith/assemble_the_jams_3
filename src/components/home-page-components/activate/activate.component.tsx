import { useContext } from "react"
import Button from "../../reusable-components/button/button.component"
import Spinner from "../../reusable-components/spinner/spinner.component"
import { PlayerContext } from "../../../contexts/player.context"
import { ActivateContainer } from "./activate.styles"

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
                <Button disabled={currentPlayer === null} onClick={activate} >CONTINUE</Button> :
                <Spinner loading={true} />
             }
        </ActivateContainer>
    )
}

export default Activate