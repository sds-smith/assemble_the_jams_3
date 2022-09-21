import { useContext, FC } from 'react'
import { FooterContainer, Tab } from './footer.styles'
import { ResponsiveContext } from '../../../contexts/responsive.context';

const Footer: FC = () => {
    const { activeTab, activeView, setMobileHome, setMobilePlaylist, setMobileSearchResults } = useContext(ResponsiveContext) 

    return (
        <FooterContainer>
            <Tab
                onClick={setMobileHome} 
                isActiveLink={activeView.input} >
            Home
            </Tab>
            <Tab
                onClick={setMobilePlaylist} 
                isActiveLink={activeView.results && activeTab.playlist} >
            Playlist
            </Tab>   
            <Tab 
                onClick={setMobileSearchResults} 
                isActiveLink={activeTab.search_results}>
            Search Results
            </Tab>
        </FooterContainer>
    )
}

export default Footer