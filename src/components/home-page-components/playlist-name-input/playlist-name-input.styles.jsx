import styled from "styled-components";

export const PlaylistNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-top: 1rem;
    margin-bottom: 1rem;
`

export const NameInput = styled.input`
    width: ${props => props.width || '287px'};
    padding: .88rem 0;
    border: 1px solid #fff;
    border-radius: 3px;
    margin-bottom: 1rem;
    color: #010c3f;
    text-align: center;
    font-size: 1rem;

    &:focus {
        outline: none;
      }
`
