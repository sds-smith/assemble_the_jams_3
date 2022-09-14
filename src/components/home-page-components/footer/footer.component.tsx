import { useContext, FC, Dispatch, SetStateAction } from 'react'
import { FooterContainer, Tab } from './footer.styles'
import { ResponsiveContext } from '../../../contexts/responsive.context';

export type ActiveTab = {
    'playlist' : boolean;
    'search_results' : boolean;
}

type FooterProps = {
    activeTab: ActiveTab;
    setActiveTab: Dispatch<SetStateAction<ActiveTab>>
}

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