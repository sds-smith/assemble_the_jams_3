import { useContext, FC, Dispatch, SetStateAction } from 'react'
import { ResponsiveContext } from '../../../contexts/responsive.context'
import { FooterContainer } from './footer.styles'
import { Tab } from './footer.styles'

const Footer: FC = () => {
    const { activeTab, setActiveTab, activeView, setActiveView } = useContext(ResponsiveContext)

    const searchView = () => {
        setActiveView({'input': true, 'results': false})
    }
    const resultsView = () => {
        setActiveView({'input': false, 'results': true})
    }
    const playlistActive = () => {
        resultsView()
        setActiveTab({'playlist' : true, 'search_results' : false})
    }
    const searchResultsActive = () => {
        resultsView()
        setActiveTab({'playlist' : false, 'search_results' : true})
    }

    return (
        <FooterContainer>
            <Tab
                onClick={searchView}
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