import { FC } from "react";

import { ActionMessageContainer } from "./action-message.styles";

type ActionMessageProps = {
    bottom: string;
    right: string;
    width?: string;
    children: string;
}

const ActionMessage: FC<ActionMessageProps> = ({ bottom, right, width, children }) => {
    return (
        <ActionMessageContainer 
            bottom={bottom} 
            right={right} 
            width={width || '7rem'} 
        >
            {children}
        </ActionMessageContainer>
    )
}

export default ActionMessage