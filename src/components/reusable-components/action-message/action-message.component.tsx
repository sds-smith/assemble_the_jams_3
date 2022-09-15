import { FC } from "react";

import { ActionMessageContainer } from "./action-message.styles";

type ActionMessageProps = {
    position?: string;
    bottom?: string;
    right?: string;
    top?: string;
    left?: string
    width?: string;
    children: string;
}

const ActionMessage: FC<ActionMessageProps> = ({ position, bottom, right, top, left, width, children }) => {
    return (
        <ActionMessageContainer 
            position={position}
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