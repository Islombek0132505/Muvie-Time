import SectionContainer from "../../components/section.container"
import SearchGenresForm from "./components/search-genres"
import SearchNameForm from "./components/search-name"

function Search() {
    
    return (
        <SectionContainer className="mt-10">
            <SearchGenresForm/>
            <span className="w-full h-[2px] bg-gray-400 mt-4"></span>
            <SearchNameForm/>
        </SectionContainer>
    )
}

export default Search