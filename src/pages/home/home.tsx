import Premiere from "../../components/premiere"
import TopMuviesSection from "./top-muvies.section"
import PopularMuviesSection from "./popular-muvies.section"
import UpcomingMuviesSection from "./upcoming-muvies.section"

function Home() {

    return (
        <>
            <Premiere />
            <PopularMuviesSection/>
            <TopMuviesSection/>
            <UpcomingMuviesSection/>
        </>
    )
}

export default Home