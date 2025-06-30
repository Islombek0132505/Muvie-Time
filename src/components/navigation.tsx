import { navItems } from "../constants"
import { cn } from "../../utils/cn"
import Logo from "./logo"
import { NavLink } from "react-router"
import { motion } from "framer-motion"


function Navigation() {

    return (
        <motion.div 
            className="w-full h-32 flex items-center justify-between px-12 border-b-2 max-md:h-24 max-md:px-4"
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.3}}
        >
            
            <Logo/>
            <motion.div 
                initial={{x: 200, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 0.5, ease: "easeInOut", delay: 1.3}}
                className="flex items-center gap-4 text-white"
            >
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.route}
                    >
                        <item.icon className="max-md:size-6 md:size-7 lg:size-8"/>
                    </NavLink>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default Navigation