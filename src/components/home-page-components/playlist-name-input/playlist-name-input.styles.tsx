import styled from "styled-components";

export const NameInput = styled.input`
    width: ${props => props.width || '287px'};
    padding: .88rem 0;
    border: 1px solid #fff;
    border-radius: 3px;
    margin: 1rem;
    color: #010c3f;
    text-align: center;
    font-size: 1rem;

    &:focus {
        outline: none;
      }
`
