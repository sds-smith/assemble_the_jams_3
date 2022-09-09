import styled from "styled-components";

export const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-top: 1rem;
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

export const TermSelector = styled.div`
    position: absolute;
    top: 5rem;
    width: 287px;
    border: 1px solid rgba(255, 255, 255, .6);
    border-radius: 3px;
    margin-top: -1rem;
    margin-bottom: 1rem;
    background-color: rgb(255, 255, 255);
`
