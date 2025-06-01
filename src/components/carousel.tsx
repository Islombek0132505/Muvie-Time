import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { cn } from "../../utils/cn";

interface ICarousel extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    interval?: number,
    autoScroll?: boolean,
    carouselItemsCount: number
}

const Carousel = ({children, autoScroll, interval, className, carouselItemsCount, ...props} : ICarousel) => {
    
    const [currIndex, setCurrIndex] = useState(0)

    const next = () => {
        const newIndex = currIndex === carouselItemsCount - 1 ? 0 : currIndex + 1
        setCurrIndex(newIndex)
    }

    const prev = () => {
        const newIndex = currIndex === 0 ? carouselItemsCount - 1 : currIndex - 1
        setCurrIndex(newIndex)
    }
    
    useEffect(() => {
        if(autoScroll) {
            const intervalF = setInterval(() => {
                setCurrIndex(currIndex => currIndex === carouselItemsCount-1 ? 0 : currIndex + 1)                
            }, interval ? interval : 4000)
            return () => clearInterval(intervalF)
        }
    }, [autoScroll, carouselItemsCount, interval])

    return (
        <div 
            className={cn("overflow-hidden relative", className)}
            {...props}
        >
            <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{transform: `translateX(-${currIndex * 100}%)`}}
            >
                {children}
            </div>
            <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-24 backdrop-blur-sm bg-gray-200/10 rounded-r-md border-y-[1px] border-r-[1px] border-gray-300/40 hover:bg-gray-400/40 transition-colors max-md:w-8 max-md:h-18"
                onClick={prev}
            >
                <FaAngleLeft className="text-gray-200 mx-auto size-6 max-md:size-4"/>
            </button>
            <button 
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-24 backdrop-blur-sm bg-gray-200/10 rounded-l-md border-y-[1px] border-l-[1px] border-gray-300/40 hover:bg-gray-400/40 transition-colors max-md:w-8 max-md:h-18"
            >
                <FaAngleRight className="text-gray-200 mx-auto size-6 max-md:size-4"/>
            </button>
        </div>
    )
}

export default Carousel