import EventAndContest from "../EventAndContest/EventAndContest"
import HomeAnnouncement from "../HomeAnnouncement/HomeAnnouncement"
import HomeCarousel from "../HomeCarousel/HomeCarousel"
import HomeDailyProblem from "../HomeDailyProblem/HomeDailyProblem"
import HomeFooter from "../HomeFooter/HomeFooter"
import HomeHeader from "../HomeHeader/HomeHeader"
import HomeNavbar from "../HomeNavbar/HomeNavbar"
import HomeTopPerformer from "../HomeTopPerformer/HomeTopPerformer"
import "./Home.css"

const Home = () => {

    return (
        <>
            <HomeHeader />
            {/* <HomeNavbar /> */}
            <HomeCarousel />
            <HomeTopPerformer />
            <EventAndContest />
            <HomeAnnouncement />
            <HomeDailyProblem />
            <HomeFooter />
        </>
    )
}

export default Home