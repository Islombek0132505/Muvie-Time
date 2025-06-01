import { useNavigate } from "react-router"
import logo from "../assets/play.png"
import { motion } from "framer-motion"

function Logo() {

    const navigate = useNavigate()

    const logoTapped = () => {
        navigate("/")
        window.location.reload()
    }

    return (
        <motion.div 
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut", delay: 1.3}}
            className="text-4xl text-white font-medium flex items-center gap-1 cursor-pointer"
            onClick={logoTapped}
        >
            Muvie
            <img 
                src={logo}
                alt="logo"
                className="size-8" 
            />
            Time
        </motion.div>
    )
}

export default Logo