import { useNavigate } from "react-router"
import { useGenreStore, useSearchMuvieStore } from "../../stores"

interface IMuvieInfoItem{
    name: string
    title?: string
    link?: [{name: string}]
}

function MuvieInfoItem({name, title, link}: IMuvieInfoItem) {

    const navigate = useNavigate()
    const {setSearchGenreId, setSearchGenreName} = useSearchMuvieStore()
    const {genres} = useGenreStore()

    const toMuvieWithGenres = (name: string) => {
        setSearchGenreName(name)
        genres?.forEach(item => {
            if(item.name === name) {
                setSearchGenreId(item.id)
            }
        })
        navigate(`/muvies/${name}`)
    }

    return (
        <div className="grid grid-cols-4 text-lg relative rounded-md overflow-hidden group max-md:text-base">
            <p className="col-span-1 text-center bg-gray-600 py-2">{name}</p>
            <div className="col-span-3 bg-slate-900 p-2 flex flex-wrap items-center gap-2">
                {
                    title && <p className="text-gray-400">{title}</p>
                }
                {
                    link && link.map((item, index) => (
                        <p
                            onClick={() => toMuvieWithGenres(item.name)}
                            key={index}
                            className="text-gray-500 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
                        >
                            {item.name}
                        </p>
                    ))
                }
            </div>
            {/* <span className="absolute bg-blue-500 h-[2px] bottom-0 left-0 w-0 group-hover:w-full duration-500 ease-in-out"/> */}
        </div>
    )
}

export default MuvieInfoItem