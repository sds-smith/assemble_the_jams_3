import styled from "styled-components";

export const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30%;
    align-items: center;
    padding-top: 1rem;
    margin-bottom: 1rem;
`

export const SearchBarInput = styled.input`
    width: 287px;
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
