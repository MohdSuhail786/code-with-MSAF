export default function HomeTopPerformer() {
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
                  Ratings
                </p>
              </div>
              <div className="l-performers">
                <div className="l-performer">
                  <div className="l-performer__number">
                    <p className="m-performer__number">1.</p>
                  </div>
                  <div className="l-performer__text">
                    <p className="l-performer__username">
                      <span className="m-user-star" style={{background:'#D0011B'}}>
                        7&nbsp;&#9733;
                      </span>
                      <a
                        className="m-performer__username"
                        style={{color:'#2a67b1',textDecoration:'none'}}
                        href="#"
                      >
                        @test-user
                      </a>
                    </p>
                    <p className="m-performer__rating">4432</p>
                  </div>
                </div>
                <div className="l-performer">
                  <div className="l-performer__number">
                    <p className="m-performer__number">2.</p>
                  </div>
                  <div className="l-performer__text">
                    <p className="l-performer__username">
                      <span className="m-user-star" style={{background:'#D0011B'}}>
                        7&nbsp;&#9733;
                      </span>
                      <a
                        className="m-performer__username"
                        style={{color:'#2a67b1',textDecoration:'none'}}
                        href="#"
                      >
                        @test-user
                      </a>
                    </p>
                    <p className="m-performer__rating">3160</p>
                  </div>
                </div>
                <div className="l-performer">
                  <div className="l-performer__number">
                    <p className="m-performer__number">3.</p>
                  </div>
                  <div className="l-performer__text">
                    <p className="l-performer__username">
                      <span className="m-user-star" style={{background:'#D0011B'}}>
                        7&nbsp;&#9733;
                      </span>
                      <a
                        className="m-performer__username"
                        style={{color:'#2a67b1',textDecoration:'none'}}
                        href="#"
                      >
                        @test-user
                      </a>
                    </p>
                    <p className="m-performer__rating">3084</p>
                  </div>
                </div>
                <div className="l-performer">
                  <div className="l-performer__number">
                    <p className="m-performer__number">4.</p>
                  </div>
                  <div className="l-performer__text">
                    <p className="l-performer__username">
                      <span className="m-user-star" style={{background:'#D0011B'}}>
                        7&nbsp;&#9733;
                      </span>
                      <a
                        className="m-performer__username"
                        style={{color:'#2a67b1',textDecoration:'none'}}
                        href="#"
                      >
                        @test-user
                      </a>
                    </p>
                    <p className="m-performer__rating">3061</p>
                  </div>
                </div>
                <div className="l-performer">
                  <div className="l-performer__number">
                    <p className="m-performer__number">5.</p>
                  </div>
                  <div className="l-performer__text">
                    <p className="l-performer__username">
                      <span className="m-user-star" style={{background:'#D0011B'}}>
                        7&nbsp;&#9733;
                      </span>
                      <a
                        className="m-performer__username"
                        style={{color:'#2a67b1',textDecoration:'none'}}
                        href="#"
                      >
                        @test-user
                      </a>
                    </p>
                    <p className="m-performer__rating">3046</p>
                  </div>
                </div>{" "}
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
