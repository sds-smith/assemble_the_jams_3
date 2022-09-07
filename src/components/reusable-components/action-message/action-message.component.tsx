import { FC } from "react";

import { ActionMessageContainer, ActionMessageProps } from "./action-message.styles";

const ActionMessage: FC<ActionMessageProps> = ({ bottom, right, width, children }) => {
    return (
        <ActionMessageContainer bottom={bottom} right={right} width={width} >{children}</ActionMessageContainer>
    )
}

export default ActionMessage