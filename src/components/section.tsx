import { NavLink } from "react-router"
import SectionContainer from "./section.container"
import type { HTMLAttributes, ReactNode } from "react"

interface ISection extends HTMLAttributes<HTMLDivElement> {
    title: string,
    desc?: string,
    moreLink: string,
    children?: ReactNode
}

function Section({title, desc, moreLink, className, children, ...props}: ISection) {
    
    return (
        <SectionContainer>
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col text-white gap-2 max-md:gap-0 border-l-4 border-blue-500 pl-4">
                    <h1 className="text-3xl font-medium max-md:text-lg">{title}</h1>
                    <p className="max-md:text-xs">{desc}</p>
                </div>
                <NavLink
                    to={moreLink}
                    className="px-8 py-2 rounded-full text-gray-400 bg-gray-800 no-underline hover:animate-pulse max-md:text-sm max-md:px-6"
                >
                    All
                </NavLink>
            </div>
            <div className={className} {...props}>
                {children}
            </div>
            
        </SectionContainer>
    )
}

export default Section