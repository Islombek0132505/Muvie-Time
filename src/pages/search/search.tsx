import { useEffect, useState } from "react"
import SectionContainer from "../../components/section.container"
import { useGenreStore } from "../../stores"
import MuvieService from "../../services/muvie-service"
import type { IData, IMuvies } from "../../models"
import { useParams } from "react-router"
import LoadingWindow from "../../components/loading-window"
import MuvieCard from "../../components/muvie.cars"

function Search() {

    const {genres} = useGenreStore()
    const muvieService = new MuvieService()
    const [paginationIndex, setPaginationIndex] = useState<number>(1)
    const [muviesList, setMuvieList] = useState<IMuvies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const {type} = useParams()

    const nextAction = () => {
        setLoading(true)
        setPaginationIndex(index => index += 1)
    }

    const prevAction = () => {
        setLoading(true)
        setPaginationIndex(index => index === 1 ? 1 : index -= 1)
    }

    useEffect(() => {
        
        muvieService.searchMuviesWithGenres(genres?.find(item => item.name === type)?.id, paginationIndex)
            .then(data => {
                try {
                    const muvieData = data as IData
                    setMuvieList(muvieData.results)
                } catch (error) {
                    throw new Error(`Error: ${error}`)
                }
            })
            .finally(() => setLoading(false))
    }, [paginationIndex])

    if(loading) {
        return <LoadingWindow/>
    }

    return (
        <SectionContainer className="mt-10">
            <h1 className="text-4xl text-white font-medium max-md:text-2xl border-l-4 border-blue-500 pl-4 mb-4">
                {type}
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
                >
                    Prev
                </button>
                <button
                    className="py-2 rounded-md bg-gray-700 px-6 text-white font-medium hover:bg-gray-700/70 transition-colors"
                    onClick={nextAction}
                >
                    Next
                </button>
            </div>
        </SectionContainer>
    )
}

export default Search