import { useEffect, useState } from "react"
import Section from "../../components/section"
import MuvieService from "../../services/muvie-service"
import type { IData, IMuvies } from "../../models"
import MuvieCard from "../../components/muvie.cars"
import { muvieTypes } from "../../constants"

function TopMuviesSection() {

    const [topMuvies, setSeries] = useState<IMuvies[]>([])

    useEffect(() => {
        const muvieService = new MuvieService()
        muvieService.getMuviesWithType("top_rated").then(data => {
            try {
                const muviesData = data as IData
                console.log(muviesData.results)
                setSeries(muviesData.results.slice(0, 8))
            } catch (error) {
                throw new Error(`error catching: ${error}`)
            }
        })
    }, [])

    return (
        <Section 
            title="Top Muvies"
            desc="Watch and enjoy with top rated muvies" 
            moreLink={`/${muvieTypes.top}`}
            className="grid grid-cols-4 gap-4 max-md:grid-cols-2"
        >
            {topMuvies.map((item, index) => (
                <MuvieCard key={index} {...item}/>
            ))}
        </Section>
    )
}

export default TopMuviesSection