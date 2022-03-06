const HomeAnnouncement = () => {
  return (
    <>
      <section className="l-section l-section--yellow-6" id="announcements">
        <div className="l-row l-row--1024">
          <div className="l-row--800">
            <div className="l-row--680">
              <h2 className="m-head__2">Announcements</h2>
            </div>
            <div className="l-announcement">
              <div className="l-announcement__icon">
                <i className="i-announcement"></i>
              </div>
              <div className="l-announcement__container">
                <div className="l-announcement__content">
                  <div className="l-announcement__text">
                    <p className="m-announcement__head">
                      Starter 29 Solutions{" "}
                    </p>
                    <p className="m-announcement__desc">
                      Solution of Starter 29 is out now!
                    </p>
                  </div>
                  <div className="l-announcement__link">
                    <a
                      className="m-announcement__link"
                      href="#"
                    >
                      View Here
                      <span className=" m-announcement__link--icon i-right-arrow-black--container">
                        <i className="i-right-arrow-blue"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <p className="m-announcement__time">
                  21:52:58 IST, 28TH FEB 2022&nbsp;IST
                </p>
              </div>
            </div>
            <hr className="l-announcement__divider" />{" "}
            <div className="l-announcement">
              <div className="l-announcement__icon">
                <i className="i-announcement"></i>
              </div>
              <div className="l-announcement__container">
                <div className="l-announcement__content">
                  <div className="l-announcement__text">
                    <p className="m-announcement__head">
                      XYZ is Hiring from CodingWorm!{" "}
                    </p>
                    <p className="m-announcement__desc">
                      Hurry up! participate in contests. This month, we have Chingari as our
                      Hiring Sponsor.{" "}
                    </p>
                  </div>
                  <div className="l-announcement__link">
                    <a
                      className="m-announcement__link"
                      href="#"
                    >
                      View Here
                      <span className=" m-announcement__link--icon i-right-arrow-black--container">
                        <i className="i-right-arrow-blue"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <p className="m-announcement__time">
                  08:50:37 IST, 26TH FEB 2022&nbsp;IST
                </p>
              </div>
            </div>
            <hr className="l-announcement__divider" />{" "}
            <div className="l-announcement">
              <div className="l-announcement__icon">
                <i className="i-announcement"></i>
              </div>
              <div className="l-announcement__container">
                <div className="l-announcement__content">
                  <div className="l-announcement__text">
                    <p className="m-announcement__head">
                      Starters 28 Solutions{" "}
                    </p>
                    <p className="m-announcement__desc">
                      Solutions of Starters 28 are out now!{" "}
                    </p>
                  </div>
                  <div className="l-announcement__link">
                    <a
                      className="m-announcement__link"
                      href="#"
                    >
                      View Here
                      <span className=" m-announcement__link--icon i-right-arrow-black--container">
                        <i className="i-right-arrow-blue"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <p className="m-announcement__time">
                  10:16:04 IST, 3RD MAR 2022&nbsp;IST
                </p>
              </div>
            </div>
            <div className="l-margin-bottom-0"> </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAnnouncement;
