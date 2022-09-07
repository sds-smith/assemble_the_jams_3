import { Dispatch, SetStateAction } from 'react'
import { FooterContainer } from './footer.styles'
import { Tab } from './footer.styles' 
import { ActiveTab } from '../../../routes/home/home.component'

type FooterProps = {
    activeTab: ActiveTab;
    setActiveTab: Dispatch<SetStateAction<ActiveTab>>
}

const Footer = ({ activeTab, setActiveTab }: FooterProps) => {
    return (
        <FooterContainer>
            <Tab
                onClick={()=>setActiveTab({'playlist' : true, 'search_results' : false})} 
                active={activeTab.playlist} >
            Playlist
            </Tab>   
            <Tab 
                onClick={()=>setActiveTab({'playlist' : false, 'search_results' : true})} 
                active={activeTab.search_results}>
            Search Results
            </Tab>
        </FooterContainer>
    )
}

export default Footer