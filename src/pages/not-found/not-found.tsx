import { useNavigate } from "react-router"

function NotFound() {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center mt-10 flex-col gap-4">
            <h1 className="text-4xl font-bold text-white">This page does not exist!!!</h1>
            <p 
                className="text-3xl text-blue-500 underline underline-offset-4 hover:cursor-pointer"
                onClick={() => navigate("/")}
            >
                Go to Home
            </p>
        </div>
    )
}

export default NotFound