import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_PRACTICE_ROUTE } from "../../../config";
import { getProblemOfTheDay } from "./store/action";

const HomeDailyProblem = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProblemOfTheDay());
  }, []);
  const {problem} = useSelector(state => state.problemOfTheDay);

  return (
    <>
      <section className="l-section-1">
        <div className="l-row l-row--1024">
          <div className="l-row--800">
            <div className="l-row--680">
              <h2 className="m-head__2">Practice Problems</h2>
            </div>

            <div className="l-card-11">
              <div className="l-card__11--highlight l-margin-bottom-4">
                <h3 className="m-card-11__head">Problem of the Day</h3>
                <span className="m-card__11--highlight">New</span>
              </div>
              <p className="m-card-11_desc l-margin-bottom-24">
                Solve a New Problem Everyday & enhance your problem solving
                skills.
              </p>
              <p className="m-card-11_head-2 l-margin-bottom-24">
                Today’s Problem: {problem.name}
              </p>
              <div className="l-button-1">
                <a href={`/problem/${problem.problemCode}`} className="m-button-1">
                  Solve the Problem<i className="i-arrow-no-tail-blue"></i>
                </a>
              </div>
            </div>
            <p className="m-head__11 l-margin-bottom-16">
              Solve / Practice problems as per your convenience
            </p>
            <hr className="l-card-divider l-margin-top-0" />
            <div className="l-practice">
              <div className="l-practice__icon">
                <i className="i-practice"></i>
              </div>
              <div className="l-practice__content">
                <p className="m-practice__head">
                  CodingWorm a huge problem library with a wide variety of
                  problems.
                </p>
                <div className="l-card-link-1 l-margin-bottom-0">
                  <a
                    className="m-card-link-1 l-margin-bottom-0"
                    href={DEFAULT_PRACTICE_ROUTE}
                  >
                    Difficulty Level
                    <span className="i-right-arrow-black--container">
                      <i className="i-right-arrow-blue"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="l-practice l-margin-bottom-0">
              <div className="l-practice__icon">
                <i className="i-practice"></i>
              </div>
              <div className="l-practice__content">
                <p className="m-practice__head">
                  Practice Problem using our Tag Search
                </p>
                <div className="l-card-link-1 l-margin-bottom-0">
                  <a
                    className="m-card-link-1 l-margin-bottom-0"
                    href={DEFAULT_PRACTICE_ROUTE}
                  >
                    Tags
                    <span className="i-right-arrow-black--container">
                      <i className="i-right-arrow-blue"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeDailyProblem;
