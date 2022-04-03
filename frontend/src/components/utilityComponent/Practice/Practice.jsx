import queryString from "query-string";
import HomeHeader from "../HomeHeader/HomeHeader";
import "../Home/Home.css";
import PracticeBanner from "../PracticeBanner/PracticeBanner";
import PracticeProblems from "../PracticeProblems/PracticeProblems";
import HomeFooter from "../HomeFooter/HomeFooter";

export default function Practice() {
  const query = queryString.parse(window.location.search);

  console.log(query);
  return (
    <>
      <HomeHeader />
      <div style={{height:70}}></div>
      <PracticeBanner />
      <PracticeProblems />
      <HomeFooter />
    </>
  );
}
