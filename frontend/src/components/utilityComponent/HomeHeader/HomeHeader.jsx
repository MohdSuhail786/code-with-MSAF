import "./HomeHeader.css"
import Logo from "../../../assets/images/logo_.png"
import {isUserLoggedIn,getUserData,getHomeRouteForLoggedInUser} from "../../../utils/index"
const HomeHeader = () => {
  return (
    <>
      <header className="m-header-one">
        <div className="l-header">
          <div className="l-header__logo">
            <div className="l-header__image-2">
              <a href="/">
                {/* <img
                  className="m-header__image m-header__image--pc"
                  src={Logo}
                  style={{width:60}}
                  alt="CodingWorm Logo"
                />
                <img
                  className="m-header__image m-header__image--mobile"
                  src={Logo}
                  style={{width:60}}
                  alt="CodingWorm Logo"
                /> */}
                <h2 style={{marginTop:10}}>CodingWorm</h2>
              </a>
            </div>
          </div>
          <div className="l-header__user-block">
            <div>
              {!isUserLoggedIn() ? <a className="m-login-button px-4 py-2" href="/login">New User / Login</a> :
              <a className="m-login-button px-4 py-2" href={getHomeRouteForLoggedInUser(getUserData().role)}>Dashboard</a> }
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader
