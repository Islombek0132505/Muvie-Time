import { useEffect, useState } from "react"
import SectionContainer from "../../components/section.container"
import { useGenreStore, useSearchMuvieStore } from "../../stores"
import type { IData, IMuvies } from "../../models"
import MuvieService from "../../services/muvie-service"
import LoadingWindow from "../../components/loading-window"
import MuvieCard from "../../components/muvie.card"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

function SearchResults() {

    const { searchType, searchGenreName, searchMultipleGenre } = useSearchMuvieStore()
    const { genres } = useGenreStore()
    const [ muviesList, setMuvieList ] = useState<IMuvies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [paginationIndex, setPaginationIndex] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const muvieService = new MuvieService()


    const nextAction = () => {
        setLoading(true)
        setPaginationIndex(index => index === totalPage ? totalPage : index += 1)
    }

    const prevAction = () => {
        setLoading(true)
        setPaginationIndex(index => index === 1 ? 1 : index -= 1)
    }

    useEffect(() => {
        if(searchType === "genres") {
            muvieService.getMuvieWithGenres(searchMultipleGenre, paginationIndex)
                .then(data => {
                    try {
                        const muvieData = data as IData
                        setMuvieList(muvieData.results)
                        setTotalPage(muvieData.total_pages)
                    } catch (error) {
                        throw new Error(`Error: ${error}`)
                    }
                })
                .finally(() => setLoading(false))
        }
        if (searchType === "name") {
            muvieService.searchMuvieWithName(searchGenreName, paginationIndex)
                .then(data => {
                    try {
                        const muvieData = data as IData
                        setMuvieList(muvieData.results)
                        setTotalPage(muvieData.total_pages)
                    } catch (error) {
                        throw new Error(`Error: ${error}`)
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [paginationIndex])

    if(loading) {
        return <LoadingWindow/>
    }

    return (
        <SectionContainer>
            <h1 className="text-3xl text-white pl-4 border-l-4 border-blue-500 mb-6 max-md:text-xl">
                {searchType === "genres" && `Results for this genres: ${genres && genres.filter(item => searchMultipleGenre.includes(item.id)).map(item => item.name).join(", ")}`}
                {searchType === "name" && `Result for this muvie name: ${searchGenreName}`}
            </h1>
            <div className="grid grid-cols-5 max-md:grid-cols-2 gap-4">
                {muviesList.map((item, index) => (
                    <MuvieCard key={index} {...item}/>
                ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
            
                <button 
                    className="py-2 rounded-md bg-gray-700 px-6 text-white font-medium hover:bg-gray-700/70 transition-colors"
                    onClick={prevAction}
                    disabled={paginationIndex === 1 ? true : false}
                >
                    <FaAngleLeft/>
                </button>

                <span className="text-xl text-blue-500 font-medium underline-offset-4 underline">
                    {paginationIndex}
                </span>

                <button 
                    className="py-2 rounded-md bg-gray-700 px-6 text-white font-medium hover:bg-gray-700/70 transition-colors"
                    onClick={nextAction}
                    disabled={paginationIndex === totalPage ? true : false}
                >
                    <FaAngleRight/>
                </button>
                <div className="text-white">{totalPage}</div>
            </div>
        </SectionContainer>
    )
}

export default SearchResults