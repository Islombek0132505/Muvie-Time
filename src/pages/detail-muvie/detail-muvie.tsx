import { useParams } from "react-router"
import SectionContainer from "../../components/section.container"
import MuvieService from "../../services/muvie-service"
import { useEffect, useState } from "react"
import type { IData, IMuvieDetail, IMuvies } from "../../models"
import { FaDownload } from "react-icons/fa6";
import MuvieInfoItem from "./muvie-info.item"
import { TimeConverterMinToHour } from "../../../utils/time-converter"
import LoadingWindow from "../../components/loading-window"
import MuvieCard from "../../components/muvie.cars"
import { useDetailMuvieStore } from "../../stores"
import { FaStar } from "react-icons/fa"
import { TbSeparator } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";

function DetailMuvie() {

    const path = useParams()
    const muvieService = new MuvieService()
    const [currMuvie, setCurrMuvie] = useState<IMuvieDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [similarMuvies, setSimilarMuvies] = useState<IMuvies[]>([])
    const { muvieId, selectedMuvieGanresId} = useDetailMuvieStore()

    useEffect(() => {
        setLoading(true)
        muvieService.getDetailMuvie(`${muvieId}`)
            .then(data => {            
                try {
                    const muvie = data as IMuvieDetail
                    setCurrMuvie(muvie)
                } catch (error) {
                    throw new Error(`Error: ${error}`)
                }
            })
            .finally(() => setLoading(false))
        muvieService.searchMuviesWithGenres(selectedMuvieGanresId && selectedMuvieGanresId[0])
            .then(data => {
                try {
                    const muvieData = data as IData
                    setSimilarMuvies(muvieData.results.slice(0, 10))
                } catch (error) {
                    throw new Error(`Error: ${error}`)
                }
            })
    }, [path.id])

    if(loading) {
        return <LoadingWindow/>
    }

    return (
        <SectionContainer className="mt-10">
            <h1 className="text-4xl font-medium text-white mb-4 border-l-4 border-blue-500 pl-4 max-md:text-2xl">{currMuvie?.title}</h1>
            <div className="grid grid-cols-8 text-white text-5xl bg-gray-800 py-6 px-12 max-md:p-4">
                <div className="col-span-2 max-md:col-span-8">
                    <img 
                        src={`${muvieService._imgUrl}${currMuvie?.poster_path}`} 
                        alt={currMuvie?.title}
                        className="object-cover w-full"
                    />
                    <button className="text-xl flex items-center justify-center gap-2 duration-300 hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[5px_5px_10px_2px] hover:shadow-slate-400 bg-blue-500 text-white font-medium w-full rounded-md py-2 mt-4">
                        <FaDownload className="text-white size-5"/>
                        Download
                    </button>
                </div>
                <div className="col-span-6 md:pl-10 flex flex-col gap-3 max-md:col-span-8 max-md:pt-6">
                    <MuvieInfoItem title={currMuvie?.title} name="Name"/>
                    <MuvieInfoItem link={currMuvie?.genres} name="Genres"/>
                    <MuvieInfoItem title={currMuvie?.release_date.slice(0,4)} name="Year"/>
                    <MuvieInfoItem title={TimeConverterMinToHour(currMuvie!.runtime)} name="Duration"/>
                    <MuvieInfoItem title={currMuvie?.adult ? "Adult" : "All"} name="Watch"/>
                    <MuvieInfoItem title={currMuvie?.overview} name="Short info"/>
                    <div className="flex items-center text-lg gap-2 mx-auto mt-2 border-[2px] px-2 border-gray-600 rounded shadow-lg shadow-gray-500">
                        <FaStar className="size-5 text-yellow-500"/>
                        <span> {currMuvie?.vote_average.toFixed(1)}/10</span>
                        <TbSeparator className="size-10"/>
                        <span>{currMuvie?.vote_count}</span>
                        <IoPerson className="size-5 text-blue-500"/>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 p-2 mt-12 max-md:py-4">
                <video 
                    src="https://fayllar1.ru/36/Seriallar/Sobiq%20rafiqa/Sobiq%20rafiqa%201-qism%201080p%20(asilmedia.net).mp4"
                    controls
                    className="w-full"
                >
                </video>
            </div>
            <div className="flex flex-col mt-12">
                <h1 className="border-l-4 border-blue-500 pl-4 text-3xl text-white mb-4 max-md:text-2xl">Similar movies</h1>
                <div className="grid grid-cols-5 gap-4 max-md:grid-cols-2">
                    {similarMuvies.map((item, index) => (
                        <MuvieCard {...item} key={index}/>
                    ))}
                </div>
            </div>
            
        </SectionContainer>
    )
}

export default DetailMuvie