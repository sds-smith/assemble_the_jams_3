
import { FooterContainer } from './footer.styles'
import { Tab } from '../../../routes/home/home.styles'

const Footer = ({ activeTab, setActiveTab }) => {
    return (
        <FooterContainer>
            <Tab
                onClick={()=>setActiveTab({'playlist' : true, 'search_results' : false, 'recommendations' : false})} 
                active={activeTab.playlist} >
            Playlist
            </Tab>   
            <Tab 
                onClick={()=>setActiveTab({'playlist' : false, 'search_results' : true, 'recommendations' : false})} 
                active={activeTab.search_results}>
            Search Results
            </Tab>
        </FooterContainer>
    )
}

export default Footer