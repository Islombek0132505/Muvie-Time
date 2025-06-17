import { useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";

function LoadingWindow() {

    useEffect(() => {
        const int = setInterval(() => {
            console.log("loading");
        }, 1000);
        return () => {
            clearInterval(int)
        }
    }, [])

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
            <ImSpinner9 className="size-16 max-md:size-8 text-blue-500 animate-spin"/>
        </div>
    )
}

export default LoadingWindow