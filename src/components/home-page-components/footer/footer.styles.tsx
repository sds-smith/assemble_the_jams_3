import styled from "styled-components";
import { ButtonHTMLAttributes } from 'react'

type TabProps = {
    isActiveLink: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const footerHeight = '10vh'

export const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${footerHeight};
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
    background-color: ${props => props.isActiveLink ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'} ;
    font-weight: ${props => props.isActiveLink ? 'bold' : 'unset'};
    color: ${props => props.isActiveLink ? 'white' : 'rgba(255, 255, 255, 0.5)'};
    // box-shadow: ${props => props.isActiveLink ? '0 0 0 2px #000000' : '0 4px 2px 2px #000000'};
    ${props => props.isActiveLink ? (
        'border-left: 2px solid black; border-top: 2px solid black; border-right: 2px solid black'
        ) : (
         'border-bottom: 2px solid black'
        )};
`