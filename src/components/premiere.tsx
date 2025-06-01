import { useEffect, useState } from "react"
import MuvieService from "../services/muvie-service"
import Carousel from "./carousel"
import PremiereCard from "./premiere.card"
import type { IData, IMuvies } from "../models"
import LoadingWindow from "./loading-window"
import { motion } from "framer-motion"

function Premiere() {

    const [loading, setLoading] = useState<boolean>(true)
    const muvieService = new MuvieService()
    const [premiereMuvies, setPremiereMuvies] = useState<IMuvies[]>([])

    useEffect(() => {
        muvieService.getMuviesWithType("now_playing").then(data => {
            try {
                const datas = data as IData
                setPremiereMuvies(datas.results) 
                setLoading(false)                
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        })
    })

    return(

        <>
            { loading && <LoadingWindow/> }
            { !loading && 
                <div className="w-full px-32 py-10 h-full flex flex-col justify-center items-center bg-gray-900 max-md:px-4 overflow-hidden max-md:py-6 relative">
                    <motion.h1 
                        initial={{translateY: 100, opacity: 0}}
                        animate={{translateY: 0, opacity: 1}}
                        transition={{duration: 1, ease: "easeIn", delay: 1.5}}
                        className="text-4xl animate-pulse text-white max-md:text-xl self-start border-l-4 border-blue-500 pl-4 mb-8 max-md:mb-4 "
                    >
                        Premieres
                    </motion.h1>
                    <motion.div
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 1, ease: "easeIn", delay: 0.3}}
                    >
                        <Carousel 
                            autoScroll={true} 
                            interval={6000} 
                            className="rounded-xl shadow-2xl shadow-gray-400/60 max-md:shadow-lg max-md:shadow-gray-400/50 max-md:rounded-md"
                            carouselItemsCount={20}
                        >
                            {premiereMuvies.map((item, index) => (
                                <PremiereCard {...item} key={index}/>
                            ))}
                        </Carousel>
                    </motion.div>
                </div>
            }
        </>
    )
}

export default Premiere