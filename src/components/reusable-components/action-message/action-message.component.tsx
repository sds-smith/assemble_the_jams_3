import { FC } from "react";

import { ActionMessageContainer } from "./action-message.styles";

type ActionMessageProps = {
    bottom?: string;
    right?: string;
    top?: string;
    left?: string
    width?: string;
    children: string;
}

const ActionMessage: FC<ActionMessageProps> = ({ bottom, right, top, left, width, children }) => {
    return (
        <ActionMessageContainer 
            bottom={bottom} 
            right={right} 
            top={top}
            left={left}
            width={width || '7rem'} 
        >
            {children}
        </ActionMessageContainer>
    )
}

export default ActionMessage