import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ISectionContainer extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

function SectionContainer({className, children, ...props}: ISectionContainer) {
    return (
        <section 
            className={cn("max-w-7xl flex flex-col mx-auto my-20 max-md:px-4 max-md:my-10", className)}
            {...props}
        >
            {children}
        </section>
    )
}

export default SectionContainer