import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { useSearchMuvieStore } from "../../../stores"

function SearchNameForm() {

    const [searchName, setSearchName] = useState<string>("")
    const { setSearchGenreName, setSearchType } = useSearchMuvieStore()
    const navigate = useNavigate()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchGenreName(searchName)
        setSearchType("name")
        navigate("/search-results")
    }

    return (
        <>
        <h1 className="text-3xl text-white text-center mt-10 max-md:text-2xl">Search with muvie name</h1>

        <form onSubmit={handleSubmit} action="submit" className="flex gap-2 items-center mt-4">
            <input
                type="text" 
                value={searchName}
                onChange={handleInputChange}
                className="text-white w-full h-12 max-md:h-10 bg-gray-700 rounded-md px-4 focus:outline-none text-xl"
            />
            <button 
                type="submit"
                className="text-white text-xl px-6 bg-gray-800 rounded h-12 max-md:h-10 max-md:px-3 max-md:text-lg"
            >
                Search
            </button>
        </form>
        </>
    )
}

export default SearchNameForm