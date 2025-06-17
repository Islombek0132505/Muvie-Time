import { useState } from "react"
import SectionContainer from "../../components/section.container"
import { useGenreStore } from "../../stores"
import { useNavigate } from "react-router"
import { cn } from "../../../utils/cn"

function Search() {

    const {genres} = useGenreStore()
    const [searchGenres, setSearchGenres] = useState<number[]>([])
    const navigate = useNavigate()

    const addToSearchGenres = (searchGenreID: number) => {
        if(searchGenres.includes(searchGenreID)) {
            setSearchGenres(searchGenres.filter(item => item !== searchGenreID))
        }
        if(!searchGenres.includes(searchGenreID)) {
            setSearchGenres([...searchGenres, searchGenreID])
        }
    }

    return (
        <SectionContainer className="mt-10">
            <div>
                <h1 className="text-3xl text-white text-center">Search with genres</h1>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    <h2 className="text-gray-200 text-3xl">Genres: </h2>
                    {genres?.map((item, key) => (
                        <p 
                            className={cn(
                                "text-xl px-4 py-2 text-gray-200 rounded bg-gray-700 cursor-pointer transition-colors",
                                searchGenres.includes(item.id) && "bg-blue-600"
                            )}
                            key={key}
                            onClick={() => addToSearchGenres(item.id)}
                        >
                            {item.name}
                        </p>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button 
                        onClick={() => navigate("/search/results")}
                        className="text-white mt-6 text-xl px-6 py-2 bg-gray-800 rounded"
                    >
                        Search
                    </button>
                </div>
            </div>
            
            <span className="w-full h-[2px] bg-gray-400 mt-4"></span>

            <div className="text-3xl text-white text-center mt-10">Search with muvie name</div>
            <div className="flex gap-2 items-center mt-4">
                <input 
                    type="text" 
                    className="text-white w-full h-12 bg-gray-700 rounded-md px-4 focus:outline-none text-xl"
                />
                <button 
                    onClick={() => navigate("/search/results")}
                    className="text-white text-xl px-6 bg-gray-800 rounded h-12"
                >
                    Search
                </button>
            </div>
        </SectionContainer>
    )
}

export default Search