import styled from "styled-components";
import Button from "../../reusable-components/button/button.component";
import { headerHeight } from '../../../routes/navigation/navigation.styles'
import { footerHeight } from '../footer/footer.styles'

type PlaylistProps = {
  isMobile: boolean;
}

const mobileHeight = `calc(0.9 * (100vh - ${headerHeight} - ${footerHeight}))`

export const PlaylistContainer = styled.div<PlaylistProps>`
  width: ${props => props.isMobile ? '95%' : '40%'};
  min-height: 40vh;
  max-height: ${props => props.isMobile ? mobileHeight : '90vh'};
  overflow-y: scroll;
  padding: 0.88rem 1.16rem;
  margin: 10px;
  ${props => props.isMobile && 'margin-bottom: 200px'};
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 2px 2px #000000;
  
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

export const TitleContainer = styled.div<PlaylistProps>`
    display: flex;
    justify-content: center;
    width: 100%;
    ${props => props.isMobile && 'flex-wrap: wrap'};
    input {
      display: block;
      font-size: 1.5em;
      margin: 0.6em 0;
      font-weight: bold;
      border: 0;
      outline: 0;
      text-align: center;
      padding: 0;
      background: transparent;
      font-family: 'Poppins', sans-serif;
      color: #fff;
      }

      img {
        height: 25%;
        width: auto;
        margin-top: 20px;
        margin-right: 0px;
      }
`

export const SaveToSpotifyButton = styled(Button)`
      margin: .5rem 0rem .5rem 1rem;
`
