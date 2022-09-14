import { useContext, FC } from 'react'
import { FooterContainer, Tab } from './footer.styles'
import { ResponsiveContext } from '../../../contexts/responsive.context';

const Footer: FC = () => {
    const { activeTab, activeView, setMobileHome, setMobilePlaylist, setMobileSearchResults } = useContext(ResponsiveContext) 


    return (
        <FooterContainer>
            <Tab
                onClick={setMobileHome} 
                active={activeView.input} >
            Home
            </Tab>
            <Tab
                onClick={setMobilePlaylist} 
                active={activeView.results && activeTab.playlist} >
            Playlist
            </Tab>   
            <Tab 
                onClick={setMobileSearchResults} 
                active={activeTab.search_results}>
            Search Results
            </Tab>
        </FooterContainer>
    )
}

export default Footer