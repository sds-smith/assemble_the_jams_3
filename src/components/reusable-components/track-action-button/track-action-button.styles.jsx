import styled from "styled-components";

export const TrackAction = styled.button`
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

    &:hover {
        opacity: 0.5;
    }
`