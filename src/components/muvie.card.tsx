import type { IMuvies } from "../models"
import MuvieService from "../services/muvie-service"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FaStar } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { TbSeparator } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useDetailMuvieStore } from "../stores";

function MuvieCard(data: IMuvies) {

    const muvieService = new MuvieService()
    const navigate = useNavigate()
    const {setMuvieId} = useDetailMuvieStore()

    const { ref, inView } = useInView({
        triggerOnce: true,  // ✅ faqat bir marta animatsiya bo‘lsin
        // threshold: 0.1       // 10% qismi ko‘rinsa yetarli
    })

    const toMovieDetail = () => {
        navigate(`/about-muvie/${data.title}`)
        setMuvieId(data.id)
    }

    return (
        <div className="overflow-hidden group" onClick={toMovieDetail}>
            <motion.div 
                ref={ref}
                initial={{translateX: -100, opacity: 0}}
                animate={inView ? {translateX: 0, opacity: 1} : {}}
                transition={{duration: 0.5}}
                className="flex flex-col p-1 bg-gray-800 group cursor-pointer"
            >
                <div className="overflow-hidden relative">
                    <motion.img 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                        src={`${muvieService._imgUrl}${data.poster_path}`} 
                        alt={data.title}
                        className="object-cover w-full h-[400px] max-md:h-[260px]"
                    />
                    <div className="absolute inset-0 text-white group-hover:translate-x-0 translate-x-[-100%] duration-300 delay-200 bg-black/70 flex flex-col justify-center px-2 gap-4">
                        <h1 className="text-center text-xl font-bold">{data.title}</h1>
                        <p className="line-clamp-5 max-md:line-clamp-4 max-md:text-sm">{data.overview}</p>
                        <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-400 size-5"/>
                            {data.vote_average.toFixed(1)}
                            <TbSeparator className="size-5"/>
                            {data.vote_count} 
                            <IoPerson className="text-blue-700 size-5"/>
                        </div>
                    </div>
                </div>
                <h1 className="w-full text-white p-2 text-lg overflow-hidden text-ellipsis whitespace-nowrap max-md:text-base">{data.title}</h1>
            </motion.div>
        </div>
    )
}

export default MuvieCard