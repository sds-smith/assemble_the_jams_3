import styled from "styled-components";
import { ButtonHTMLAttributes } from 'react'

type TabProps = {
    active: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    border-top: .5px solid white;
    z-index: 20;
`

export const Tab = styled.button<TabProps>`
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 30px;
    width: 40%;
    margin: 0px;
    background-color: ${props => props.active ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'} ;
    font-weight: ${props => props.active ? 'bold' : 'unset'};
    color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
    // box-shadow: ${props => props.active ? '0 0 0 2px #000000' : '0 4px 2px 2px #000000'};
    ${props => props.active ? (
        'border-left: 2px solid black; border-top: 2px solid black; border-right: 2px solid black'
        ) : (
         'border-bottom: 2px solid black'
        )};
`