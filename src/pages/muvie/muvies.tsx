import { useEffect, useState } from "react"
import SectionContainer from "../../components/section.container"
import MuvieService from "../../services/muvie-service"
import type { IData, IMuvies } from "../../models"
import MuvieCard from "../../components/muvie.card"
import LoadingWindow from "../../components/loading-window"
import { useParams } from "react-router"
import { useMuviesTypesStore, useSearchMuvieStore } from "../../stores"
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa"
import NotFound from "../not-found/not-found"

type MuviesCompType = "fromHome" | "fromDetailMuvie"
interface IMuviesCompType {
    typeComp: MuviesCompType
}

function Muvies({typeComp}: IMuviesCompType) {

    const muvieService = new MuvieService()
    const [paginationIndex, setPaginationIndex] = useState<number>(1)
    const [muviesList, setMuvieList] = useState<IMuvies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const {type} = useParams()
    const {types} = useMuviesTypesStore()
    const [totalPage, setTotalPage] = useState<number>(1)
    const {searchGenreId, searchGenreName} = useSearchMuvieStore()

    if(types.filter(item => item.type === type).length === 0 && typeComp === "fromHome") {
        return <NotFound/>
    }

    const nextAction = () => {
        setLoading(true)
        setPaginationIndex(index => index === totalPage ? totalPage : index += 1)
    }

    const prevAction = () => {
        setLoading(true)
        setPaginationIndex(index => index === 1 ? 1 : index -= 1)
    }

    const setDataToComponent = () => {        
        if(typeComp === "fromHome") {            
            muvieService.getMuviesWithType(types.find(item => (
                item.type === type
            ))?.resType ?? "popular", paginationIndex)
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
        else if(typeComp === "fromDetailMuvie") {
            searchGenreId && muvieService.getMuvieWithGenre(searchGenreId, paginationIndex)
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
    }

    useEffect(() => {
        setDataToComponent()
    }, [paginationIndex])

    if(loading) {
        return <LoadingWindow/>
    }

    return (
        <SectionContainer>
            <h1 
                className="text-4xl text-white font-medium max-md:text-xl border-l-4 border-blue-500 pl-4 mb-4"
            >
                {typeComp === "fromHome" ? types.find(item => item.type === type)?.title ?? "Popular muvies" : searchGenreName}
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
                >
                    <FaAngleRight/>
                </button>
            </div>
        </SectionContainer>
    )
}

export default Muvies