import styled from "styled-components";

type TrackActionProps = {
    isMobile: boolean;
    clicked: boolean;
    disabled: boolean;
};

export const TrackAction = styled.button<TrackActionProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: .5rem;
    font-size: 1.05rem;
    transition: color .25s;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    transform: ${ props => props.isMobile && (props.clicked ? 'scale(1.5)' : 'scale(1)') };

    ${props => !props.isMobile && !props.disabled &&
        '&:hover {opacity: 0.5;}'
    }
`;