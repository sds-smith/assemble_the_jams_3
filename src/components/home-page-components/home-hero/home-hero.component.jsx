
import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component'
import SearchBar from '../search-bar/search-bar.component'

import { useMediaQuery } from '../../../utils/customHooks'

import { HomeHeroContainer } from './home-hero.styles'

const HomeHero = () => {
    const isMobile = useMediaQuery('(max-width : 1020px)')

    const step1 = '1. Name your New Playlist'
    const step2 = '2. Enter a search term to generate a playlist.'
    let step3 = `3. Customize your playlist by removing tracks with the remove button or adding tracks from Search Term Matches with the add button. Hear a preview of any track with the play button. Start over at any time with the 'Clear Tracklists' button.`
    const step4 = '4. Save your playlist to your Spotify account with the \'Save to Spotify\' button'
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