import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopPerformers } from "./store/action";

export default function HomeTopPerformer() {
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getTopPerformers())
  }, [])
  const topPerformers = useSelector(state => state.topPerformers)
  return (
    <>
      <section className="l-section l-section--yellow-5 mt-5">
        <div className="l-row l-row--1024">
          <div className="l-row--800">
            <div className="l-row--680">
              <h2 className="m-head__2">Top Performers</h2>
              
            </div>
            <div className="m-note-card l-section--white  l-section-card-padding l-margin-bottom-40">
              <div className="l-display-flex l-display-flex--align-space-between">
                <p className="m-head__20 l-margin-bottom-16 l-margin-top-0">
                  Users
                </p>
                <p className="m-head__20 l-margin-bottom-16 l-margin-top-0">
                  Score
                </p>
              </div>
              <div className="l-performers">
                {
                  topPerformers.list.map((user,index) => {
                    return (
                      <div className="l-performer">
                  <div className="l-performer__number">
                    <p className="m-performer__number">{index+1}.</p>
                  </div>
                  <div className="l-performer__text">
                    <p className="l-performer__username">
                    <span class="m-user-star" style={{background:user.rank_color}}>{user.rank}&nbsp;★</span>
                      <a
                        className="m-performer__username"
                        style={{color:'#2a67b1',textDecoration:'none'}}
                        href="#"
                      >
                        {user.name}
                      </a>
                    </p>
                    <p className="m-performer__rating">{user.score}</p>
                  </div>
                </div>
                    )
                  })
                }
                <hr className="l-card-divider" />
                <div className="l-card-link-1">
                  <a className="m-card-link-1" href="/ratings">
                    View All
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
}
