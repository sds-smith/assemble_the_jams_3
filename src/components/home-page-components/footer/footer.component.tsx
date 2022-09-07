import { FC, Dispatch, SetStateAction } from 'react'
import { FooterContainer } from './footer.styles'
import { Tab } from './footer.styles'

export type ActiveTab = {
    'playlist' : boolean;
    'search_results' : boolean;
}

type FooterProps = {
    activeTab: ActiveTab;
    setActiveTab: Dispatch<SetStateAction<ActiveTab>>
}

const Footer: FC<FooterProps> = ({ activeTab, setActiveTab }) => {
    const playlistActive = () => {
        setActiveTab({'playlist' : true, 'search_results' : false})
    }
    const searchResultsActive = () => {
        setActiveTab({'playlist' : false, 'search_results' : true})
    }

    return (
        <FooterContainer>
            <Tab
                onClick={playlistActive} 
                active={activeTab.playlist} >
            Playlist
            </Tab>   
            <Tab 
                onClick={searchResultsActive} 
                active={activeTab.search_results}>
            Search Results
            </Tab>
        </FooterContainer>
    )
}

export default Footer