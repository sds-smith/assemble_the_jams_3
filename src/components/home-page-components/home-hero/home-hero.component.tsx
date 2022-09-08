
import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component'
import SearchBar from '../search-bar/search-bar.component'

import PlayBtn from '../../../assets/icons/play_white24.png'
import AddBtn from '../../../assets/icons/add_white24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'

import { useMediaQuery } from '../../../utils/custom-hooks/use-media-query'

import { HomeHeroContainer, StepContainer, Icon } from './home-hero.styles'

const HomeHero = () => {
    const isMobile = useMediaQuery('(max-width : 1020px)')

    const Clear = (<Icon src={ClearBtn} alt='clear'/>)
    const Add = (<Icon src={AddBtn} alt='add'/>)
    const Play = (<Icon src={PlayBtn} alt='play'/>)

    const step1 = '1. Name your New Playlist'
    const step2 = '2. Enter a search term to generate a playlist.'
    let step3 = [`3. Customize your playlist by removing tracks (`, Clear, `) or adding tracks (`, Add, `). Hear a preview of any track with `, Play, `. Start over at any time with the 'Clear Tracklists' button.`]
    const step4 = '4. Save your playlist to your Spotify Premium account with the \'Save to Spotify\' button'
    isMobile && step3.push(' Switch between list views with the links below.')
    
    return (
        <HomeHeroContainer isMobile={isMobile} >
            <StepContainer>{step1}</StepContainer>
            <PlaylistNameInput />
            <StepContainer>{step2}</StepContainer>
            <SearchBar />
            <StepContainer>{step3}</StepContainer>
            <StepContainer className='step4' >{step4}</StepContainer>
        </HomeHeroContainer>
    )
}

export default HomeHero