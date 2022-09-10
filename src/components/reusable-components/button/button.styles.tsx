import styled from "styled-components";

export const CustomButton = styled.button`
    cursor: pointer;
    width: 8.11rem;
    height: 50px;
    border-radius: 54px;
    background-color: green;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: .833rem;
    transition: background-color .25s;
    border: 0px;
    color: #fff;
    font-weight: 500;

    @media only screen and (min-width: 1020px) {
        &:hover {
          background-color: rgba(0, 128, 0, .6);
        }
    }
`