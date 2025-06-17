import { FaCirclePlay } from "react-icons/fa6"
import MuvieService from "../services/muvie-service"
import type { IMuvies } from "../models"
import { useNavigate } from "react-router"
import { useDetailMuvieStore } from "../stores"

function PremiereCard(data: IMuvies) {

    const muvieService = new MuvieService()
    const navigate = useNavigate()
    const {setMuvieId} = useDetailMuvieStore()

    const navigationAction = () => {
        navigate(`/about-muvie/${data.title}`)
        setMuvieId(data.id)
    }

    return (
        <div className="w-full h-[80vh] flex-shrink-0 max-md:h-[30vh] relative">
            <img 
                src={`${muvieService._imgUrl}${data.backdrop_path}`} 
                alt={data.title}
                className="w-full h-full object-cover"
            />
            <button 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4"
                onClick={navigationAction}
            >
                <FaCirclePlay className="size-20 max-md:size-10 text-blue-400 animate-pulse"/>
            </button>
            <h1 className="absolute bottom-0 w-full bg-gray-400/40 text-white font-bold text-center text-4xl max-md:text-lg py-4 max-md:py-1">{data.title}</h1>
        </div>
    )
}

export default PremiereCard