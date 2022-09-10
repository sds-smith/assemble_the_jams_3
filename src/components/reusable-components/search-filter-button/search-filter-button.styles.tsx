import styled from "styled-components";
import { HashLink } from "react-router-hash-link";

export const FilterButtonContainer = styled(HashLink)`
    text-decoration: none;
    background-color: green;
`

export const FilterButton = styled.button`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 100, 0, .7);
    border: 1px solid rgba(255, 255, 255, .2);
    color: white;
    font-size: .9rem;

    img {
        width: 1rem;
        justify-self: flex-end;
    }

    @media only screen and (min-width: 1020px) {
        &:hover {
            opacity: .8;
        }
    }
 
`