import { useState } from "react"
import { useNavigate } from "react-router"
import { useGenreStore, useSearchMuvieStore } from "../../../stores"
import { cn } from "../../../../utils/cn"

function SearchGenresForm() {

    const {genres} = useGenreStore()
    const [searchGenres, setSearchGenres] = useState<number[]>([])
    const { setSearchMultipleGenreId, setSearchType } = useSearchMuvieStore()
    const navigate = useNavigate()

    const addToSearchGenres = (searchGenreID: number) => {
        if(searchGenres.includes(searchGenreID)) {
            setSearchGenres(searchGenres.filter(item => item !== searchGenreID))
        }
        if(!searchGenres.includes(searchGenreID)) {
            setSearchGenres([...searchGenres, searchGenreID])
        }
    }

    const startSearch = () => {
        setSearchMultipleGenreId(searchGenres)
        setSearchType("genres")
        navigate("/search-results")
    }

    return (
        <div>
            <h1 className="text-3xl text-white text-center max-md:text-2xl">Search with genres</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <h2 className="text-gray-200 text-3xl max-md:text-2xl">Genres: </h2>
                {genres?.map((item, key) => (
                    <p 
                        className={cn(
                            "text-xl px-4 py-2 text-gray-200 rounded bg-gray-700 cursor-pointer transition-colors max-md:text-lg max-md:py-1 max-md:px-2",
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
                    onClick={startSearch}
                    className="text-white mt-6 text-xl px-6 py-2 bg-gray-800 rounded max-md:text-lg max-md:px-3 max-md:py-1"
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchGenresForm