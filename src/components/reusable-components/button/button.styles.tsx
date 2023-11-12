import styled from "styled-components";

export type CustomButtonProps = {
  isMobile: boolean;
  clicked: boolean;
};

export const CustomButton = styled.button<CustomButtonProps>`
    position: relative;
    display: inline-block;
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
    overflow: hidden;
    transform: ${ props => props.isMobile && (props.clicked ? 'scale(1.5)' : 'scale(1)') };

    @media only screen and (min-width: 1020px) {
        &:hover {
          background-color: rgba(0, 128, 0, .6);
        }
    }
`;