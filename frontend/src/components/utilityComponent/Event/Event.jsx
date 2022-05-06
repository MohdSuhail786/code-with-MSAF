import ReactTooltip from "react-tooltip";
import CountdownTimer from "react-component-countdown-timer";
import HomeHeader from "../HomeHeader/HomeHeader";
import "./event.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentEvent } from "./store/action";
import { useParams } from "react-router-dom";
export default function Contest() {
  const dispatch = useDispatch()
  const {eventName} = useParams()
  const event = useSelector(state => state.event)
  const time = event.remaining_time ? Math.ceil(event.remaining_time) : 0
  useEffect(()=>{
    dispatch(getCurrentEvent({eventName}))
  },[])

  return (
    <>
      <HomeHeader />
      <div className="contest-container">
        <div class="challenges-list">
          {event.questions.map((question, index) => (
            <a
              class="js-track-click challenge-list-item"
              data-analytics="ChallengeListChallengeName"
              data-js-track="Challenge-Title"
              data-attr1="euler254"
              data-attr3="code"
              data-attr7="100"
              key={index}
              data-attr-10="0.7"
              data-attr11="false"
              href={`/event/${eventName}/${question.problemCode}`}
            >
              <div class="single-item challenges-list-view-v2 first-challenge cursor">
                <div
                  id="contest-challenges-problem"
                  class="individual-challenge-card-v2 content--list-v2 track_content"
                >
                  <div class="content--list_body">
                    <header class="content--list_header-v2">
                      <div class="challenge-name-details">
                        <div class="pull-left inline-block">
                          <h4 class="challengecard-title">
                            {question.name}
                            <div class="card-details pmT">
                              <span class="difficulty medium detail-item mr-1">
                                {question.level}
                              </span>
                              <span class="max-score detail-item mr-1">
                                Max Score: {question.point}
                              </span>
                              <span class="success-ratio detail-item">
                                Success Rate: {question.successRate}%
                              </span>
                            </div>
                          </h4>
                        </div>
                      </div>
                      <span class="bookmark-cta"></span>
                      <div class="cta-container">
                        <div class="ctas">
                          <div class="challenge-submit-btn">
                            <button class="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled">
                              <div class="ui-content align-icon-right">
                                <span class="ui-text" aria-hidden="false">
                                  {question.solved ? "Solved" : "Solve Challenge"}
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </div>
                <div
                  className="__react_component_tooltip place-top type-dark"
                  data-id="tooltip"
                ></div>
              </div>
            </a>
          ))}
        </div>
        <div style={{position:'sticky', top:'0px'}}>
          <div class="card">
            <div class="container">
              <div style={{display: 'flex', justifyContent:'space-between',alignItems:'center'}}>
              <h4>Event Details</h4>
              <a data-tip data-for='share'> <i class="fa fa-share-alt"></i> </a>
            <ReactTooltip id='share' type='success' effect='solid'>
            <span>Share Event</span>
            </ReactTooltip>
              </div>
              <p>{event.event_name}</p>
              <span style={{ color: "#1ba94c" }}>
                Organized by: {event.event_organizer_name}
              </span>
            </div>
          </div>
          <div class="card mt-3 counter-heading">
            <div class="container">
            <h5>{event.counter_heading}</h5>
                {time !== 0 && <CountdownTimer
                  count={time}
                  showTitle
                  border
                  noPoints
                  size={30}
                  style={{ border: "none" }}
                  responsive
                  color="#27bf65"
                />}
            </div>
          </div>
          <div class="card mt-3 counter-heading">
            <div class="container">
            <h5>Important Links</h5>
                <li><a href={`/event/${eventName}/leaderboard`}>
                    <span style={{ color: "#1ba94c" }}>
                        Leaderboard
                    </span>

                </a></li>
                <li><a href={`/event/${eventName}/submissions`}>
                    <span style={{ color: "#1ba94c" }}>
                        Submissions
                    </span>

                </a></li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
