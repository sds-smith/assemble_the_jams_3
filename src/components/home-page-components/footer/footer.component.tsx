import { useContext, FC } from 'react'
import { ResponsiveContext } from '../../../contexts/responsive.context'
import { FooterContainer } from './footer.styles'
import { Tab } from './footer.styles'

const Footer: FC = () => {
    const { activeTab, activeView, setMobileHome, setMobilePlaylist, setMobileSearchResults  } = useContext(ResponsiveContext)

    const homeView = () => {
        setMobileHome()
    }
    const playlistActive = () => {
        setMobilePlaylist()
    }
    const searchResultsActive = () => {
        setMobileSearchResults()
    }

    return (
        <FooterContainer>
            <Tab
                onClick={homeView}
                active={activeView.input}>
            Home
            </Tab>
            <Tab
                onClick={playlistActive} 
                active={activeView.results && activeTab.playlist} >
            Playlist
            </Tab>   
            <Tab 
                onClick={searchResultsActive} 
                active={activeView.results && activeTab.search_results}>
            Search Results
            </Tab>
        </FooterContainer>
    )
}

export default Footer