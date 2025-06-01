import { useEffect, useState } from "react"
import Section from "../../components/section"
import MuvieService from "../../services/muvie-service"
import type { IData, IMuvies } from "../../models"
import MuvieCard from "../../components/muvie.cars"
import { muvieTypes } from "../../constants"

function PopularMuviesSection() {

    const muvieService = new MuvieService()
    const [popularMuvies, setPopularMuvies] = useState<IMuvies[]>([])

    useEffect(() => {
        muvieService.getMuviesWithType("popular").then(data => {
            try {
                const muviesData = data as IData
                setPopularMuvies(muviesData.results.slice(0, 8))               
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        })
    }, [])

    return (
        <Section 
            title="Popular Muvies"
            desc="Watch and enjoy with popular muvies" 
            moreLink={`/${muvieTypes.popular}`}
            className="grid grid-cols-4 gap-4 max-md:grid-cols-2"
        >
            {popularMuvies.map((item, index) => (
                <MuvieCard key={index} {...item}/>
            ))}
        </Section>
    )
}

export default PopularMuviesSection