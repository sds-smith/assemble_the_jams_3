import styled from "styled-components";
import { headerHeight } from "../navigation/navigation.styles";
import { footerHeight } from '../../components/home-page-components/footer/footer.styles'

type HomeProps = {
    isMobile: boolean;
}

const desktopHeight = `calc(100vh - ${headerHeight})`
const mobileHeight = `calc(100vh - ${headerHeight} - ${footerHeight})`

export const HomeContainer = styled.div<HomeProps>`
    min-height: ${props => props.isMobile ? mobileHeight : desktopHeight};
    position: relative;
    padding: 0 5% 10% 5%;
    background-image: linear-gradient(115deg, green, black);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    color: #ffffff;
`

export const InputContainer = styled.div<HomeProps>`
    ${props => props.isMobile && `height: ${mobileHeight}`}
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'space-between'};
    width: 100%;
`

export const ResultsContainer = styled.div<HomeProps>`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'unset'};
    align-items: ${props => props.isMobile ? 'center' : 'unset'};
    justify-content: ${props => props.isMobile ? 'flex-start' : 'center'};
    width: 100%;
`