

import { ActionMessageContainer } from "./action-message.styles";

const ActionMessage = ({ bottom, right, width, children }) => {
    return (
        <ActionMessageContainer bottom={bottom} right={right} width={width} >{children}</ActionMessageContainer>
    )
}

export default ActionMessage