import { useEffect, useState } from "react"
import Section from "../../components/section"
import MuvieService from "../../services/muvie-service"
import type { IData, IMuvies } from "../../models"
import MuvieCard from "../../components/muvie.card"
import { muvieTypes } from "../../constants"

function UpcomingMuviesSection() {

    const muvieService = new MuvieService()
    const [upcomingMuvies, setSeries] = useState<IMuvies[]>([])

    useEffect(() => {
        muvieService.getMuviesWithType("upcoming").then(data => {
            try {
                const muviesData = data as IData
                setSeries(muviesData.results.slice(0, 10))
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        })
    }, [])

    return (
        <Section 
            title="Upcoming Muvies"
            desc="Here are upcoming muvies"
            moreLink={`/${muvieTypes.upcoming}`}
            className="grid grid-cols-5 gap-4 max-md:grid-cols-2"
        >
            {upcomingMuvies.map((item, index) => (
                <MuvieCard key={index} {...item}/>
            ))}
        </Section>
    )
}

export default UpcomingMuviesSection