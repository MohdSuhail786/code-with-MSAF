const EventAndContest = () => {
  return (
    <>
      <hr className="l-section-divider-1" />
      <section className="l-section-1" id="upcoming-events">
        <div className="l-row l-row--1024">
          <div className="l-row--800 l-margin-bottom-64">
            <div className="l-row--680">
              <h2 className="m-head__2">Events and Contests</h2>
            </div>
            <h3 className="m-head__11 l-margin-bottom-16">Upcoming Events</h3>
            <hr className="l-card-divider l-margin-top-0" />
            <div className="l-card-3 m-other-event-card">
              <div className="l-card-3__col-1">
                <div className="l-card-3__date-1">
                  <p className="m-card-3__date-1-desc">Starts On</p>
                  <div className="l-card-3__date-1-text">
                    <p className="m-card-3__day">05</p>
                    <p className="m-card-3__month">Mar</p>
                  </div>
                </div>
              </div>
              <div className="l-card-3__col-2">
                <div className="l-card-3__info">
                  <h3 className="m-card-3__head">Starter 28</h3>
                  <p className="m-card-3__desc">
                    <span className="m-card-3__desc-type">Contest</span>|
                    <span className="m-card-3__time-clock">
                      <i className="i-clock-grey l-margin-right-8"></i>
                      08:00 PM&nbsp;IST
                    </span>
                  </p>
                </div>
              </div>
              <div className="l-card-3__col-3">
                <div className="l-card-3__dtl-btn">
                  <a
                    href="/contest?name=Starter28"
                    className="m-card-3__dtl-btn"
                  >
                    Compete Here<i className="i-arrow-no-tail-blue"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="l-card-3 m-other-event-card">
              <div className="l-card-3__col-1">
                <div className="l-card-3__date-1">
                  <p className="m-card-3__date-1-desc">Starts On</p>
                  <div className="l-card-3__date-1-text">
                    <p className="m-card-3__day">09</p>
                    <p className="m-card-3__month">Mar</p>
                  </div>
                </div>
              </div>
              <div className="l-card-3__col-2">
                <div className="l-card-3__info">
                  <h3 className="m-card-3__head">Starters 29</h3>
                  <p className="m-card-3__desc">
                    <span className="m-card-3__desc-type">Contest</span>|
                    <span className="m-card-3__time-clock">
                      <i className="i-clock-grey l-margin-right-8"></i>08:00
                      PM&nbsp;IST
                    </span>
                  </p>
                </div>
              </div>
              <div className="l-card-3__col-3">
                <div className="l-card-3__dtl-btn">
                  <a
                    href="/contest?name=Starter29"
                    className="m-card-3__dtl-btn"
                  >
                    {" "}
                    Set Reminder<i className="i-arrow-no-tail-blue"></i>
                  </a>
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="l-row--800">
            <div className="m-note-card">
              <div className="l-card-7__content">
                <h3 className="m-list-head l-margin-bottom-0">
                  New to Programming?
                </h3>
                <p className="m-para l-row--680">
                  From your first baby steps to becoming a pro in the world of
                  competitive programming - your journey begins here.
                </p>
                <div className="l-button-1">
                  <a
                    href="/practice"
                    className="m-button-1"
                  >
                    Start Here<i className="i-arrow-no-tail-blue"></i>
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

export default EventAndContest;
