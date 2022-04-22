import { DEFAULT_PRACTICE_ROUTE } from "../../../config";
import Banner from "../../../assets/images/banner.png"
import BannerMobile from "../../../assets/images/banner-mobile.png"

const HomeCarousel = () => {
  return (
    <>
      <div className="l-image-with-text mt-5">
        <div className="m-image-with-text__image-1">
          <a href={DEFAULT_PRACTICE_ROUTE}>
            <img
              src={Banner}
              className="m-slider__desktop-image"
            />
            <img
              src={BannerMobile}
              className="m-slider__mobile-image"
            />
          </a>
        </div>
        <div className="l-image-with-text__text-1">
          <div className="l-image-with-text__text-top">
            <p className="m-image-with-text__head">Solve Practice Problems </p>
            <p className="m-image-with-text__desc">
            Solve challenging problems, and if you feel stuck, we have got you covered there also with video editorials.
            </p>
          </div>
          <div className="l-image-with-text__text-bottom">
            <hr className="m-image-with-text__divider" />
            <a
              className="m-image-with-text__link-1"
              href={DEFAULT_PRACTICE_ROUTE}
            >
              Solve Here
              <span className="i-right-arrow-black--container">
                <i className="i-right-arrow-blue"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCarousel;
