import styled from "styled-components";

type ProfileProps = {
    isMobile: boolean;
}

export const ProfileLink = styled.a<ProfileProps>`
    width: ${props => props.isMobile ? '100%' : '30%'};
    min-height: 100%;
    height:inherit;
    display: flex;
    flex-direction: ${props => props.isMobile ? 'unset' : 'column'};
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
`

export const ProfileImg = styled.img<ProfileProps>`
    height: ${props => props.isMobile ? '50px' : '180px'};
    width: auto;
    border-radius: 50%;
    margin-bottom: ${props => props.isMobile ? 'unset' : '5px'};
    margin-right: ${props => props.isMobile ? '5px' : 'unset'};
`