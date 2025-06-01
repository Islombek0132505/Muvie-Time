import { useEffect, useState } from "react"
import SectionContainer from "../../components/section.container"
import MuvieService from "../../services/muvie-service"
import type { IData, IMuvies } from "../../models"
import MuvieCard from "../../components/muvie.cars"
import LoadingWindow from "../../components/loading-window"
import { useParams } from "react-router"
import { useMuviesTypesStore } from "../../stores"

function Muvies() {

    const muvieService = new MuvieService()
    const [paginationIndex, setPaginationIndex] = useState<number>(1)
    const [muviesList, setMuvieList] = useState<IMuvies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const {type} = useParams()
    const {types} = useMuviesTypesStore()

    const nextAction = () => {
        setLoading(true)
        setPaginationIndex(index => index += 1)
    }

    const prevAction = () => {
        setLoading(true)
        setPaginationIndex(index => index === 1 ? 1 : index -= 1)
    }

    useEffect(() => {             
        muvieService.getMuviesWithType(types.find(item => (
            item.type === type
        ))?.resType ?? "popular", paginationIndex)
            .then(data => {
                try {
                    const muvieData = data as IData
                    setMuvieList(muvieData.results)
                } catch (error) {
                    throw new Error(`Error: ${error}`)
                }
            })
            .finally(() => setLoading(false)) 
    }, [muvieService, paginationIndex, type, types])

    if(loading) {
        return <LoadingWindow/>
    }

    return (
        <SectionContainer>
            <h1 
                className="text-4xl text-white font-medium max-md:text-xl border-l-4 border-blue-500 pl-4"
            >
                {types.find(item => item.type === type)?.title}
            </h1>
            <div className="grid grid-cols-5 gap-4 mt-12">
                {muviesList.map((item, index) => (
                    <MuvieCard {...item} key={index}/>
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

export default Muvies