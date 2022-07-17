
import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component'
import SearchBar from '../search-bar/search-bar.component'

import plus from '../../../assets/icons/add_white24.png'
import play from '../../../assets/icons/play_white24.png'

import { useMediaQuery } from '../../../utils/customHooks'

import { HomeHeroContainer } from './home-hero.styles'

const HomeHero = () => {
    const isMobile = useMediaQuery('(max-width : 1020px)')

    const step1 = '1. Name your New Playlist'
    const step2 = '2. Search for tracks'
    let step3 = `3. Add tracks to your playlist with the plus button.  Hear a preview of any track with the play button.`
    const step4 = '4. Once you\'re happy with your playlist, save it to your Spotify account with the \'Save to Spotify\' button'
    step3 += isMobile ? ' Switch between list views with the links below.' : ''
    
    return (
        <HomeHeroContainer isMobile={isMobile} >
            <p>{step1}</p>
            <PlaylistNameInput />
            <p>{step2}</p>
            <SearchBar />
            <p>{step3}</p>
            <p>{step4}</p>
        </HomeHeroContainer>
    )
}

export default HomeHero