
import Button from "../../reusable-components/button/button.component"
import { SearchBarContainer, SearchBarInput } from "./search-bar.styles"

const SearchBar = () => {

    const search = () => {
        console.log('searching so hard')
    }

    const handleTermChange = () => {
        console.log('handling it')
    }

    return (
        <SearchBarContainer onKeyPress={(e) => e.key === 'Enter' && search()}>
            <SearchBarInput placeholder="Enter A Song, Album, or Artist"  className='searchbar_input' id='search_input'onChange={handleTermChange}/>
            <Button onClick={search}>SEARCH</Button>
        </SearchBarContainer>
    )
}

export default SearchBar