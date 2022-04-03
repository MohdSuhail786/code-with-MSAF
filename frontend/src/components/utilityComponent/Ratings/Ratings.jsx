import queryString from "query-string"
import HomeHeader from "../HomeHeader/HomeHeader"

export default function Ratings() {
    const query = queryString.parse(window.location.search)
    return (
        <>
            <HomeHeader />
            <div style={{height:70}}></div>
        </>
    )
}