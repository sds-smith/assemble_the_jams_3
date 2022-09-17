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
            position={position || 'unset'}
            bottom={bottom || 'unset'} 
            right={right || 'unset'} 
            top={top || 'unset'}
            left={left || 'unset'}
            width={children ? (width || '8rem') : '0px} 
            minHeight={children ? '2rem' : 'unset'}
        >
            {children}
        </ActionMessageContainer>
    )
}

export default ActionMessage
