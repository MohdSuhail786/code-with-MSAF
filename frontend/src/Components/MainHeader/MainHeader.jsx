import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import { fetchData } from "../../middleware/RequestHandler";
import './Header.css';
function MainHeader() {
  const [showGamePopup, setShowGamePopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [sideBar, setSidebar] = useState(false);
  const [openIcon, setOpenIcon] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState(false);
  const [game, setGame] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  //   const router = useHistory();
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const open = Boolean(anchorEl);
  const API_ENDPOINT = process.env.REACT_APP_API_KEY;


  const handleClose = () => {
    console.log("this is handleclosed function");
    setAnchorEl(null);
  };
  async function getStarted() {
    setLoginPopup(true);

  }

//   useEffect(async () => {
//     const response = await (
//       await fetch(process.env.REACT_APP_API_KEY+"/verifyUser", {
//         method: "GET",
//         headers: { Authorization: localStorage.accessToken },
//       })
//     ).json();
//     if (response.message == "Unauthorized") {
//       setLoggedIn(false);
//     } else {
//       setLoggedIn(true);
//     }
//   }, []);

  const logout = ()=>{
    localStorage.clear();
    setLoggedIn(false);
    // router.push('/')
  }

  const joinHandler = async (game, paymentStatus) => {
    if (paymentStatus) {
      const payload = {
        gameId: game._id,
        userId: JSON.parse(localStorage.user).id,
        active: true,
        email: JSON.parse(localStorage.user).email,
      };
      console.log(payload);
      let response = await fetchData("/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      setSnackBarMsg("Payment successful");
      setTimeout(() => {
        // return router.push("/match");
      }, 2000);
    } else {
      setSnackBarMsg("Payment failed");
    }
    setShowSnackBar(false);
    setShowSnackBar(true);
  };








  return (
    <div>
      mainheaer
      <div id="" className="header">
        <div
          className="header-sub"
          ref={headerRef}
          style={{
            display: "flex",
            height: 70,
            justifyContent: "space-around",
            backgroundColor: "#222",
            color: "white",
            alignItems: "center",
            fontSize: "bold",
            letterSpacing: 2,
            fontSize: "larger",
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 4,
          }}
        >
          <div
            className="hide-logo"
            style={{ margin: "0px 0px" }}
            onClick={() => {
              setMenuState((menuState) => !menuState);
              console.log(menuState);
              if (!menuState) {
                menuRef.current.style.left = "0px";
                setOpenIcon(true);
              } else {
                menuRef.current.style.left = "-100%";
                setOpenIcon(false);
              }
            }}
          >
            {/* {!openIcon && <SimpleMenuSvg />} */}
            {/* {openIcon && <CrossMenuSvg />} */}
          </div>

          <div
            className="company-logo"
            onClick={() => {
              //   router.push("/");
            }}
          >
            Game A Toll
          </div>
          <div className="middle">
            <a href={process.env.REACT_APP_API_KEY + "/#howPlayId"}>
              How To Play
            </a>

            <a href={process.env.REACT_APP_API_KEY + "/#faqId"}>FAQ'S</a>

            <a
              onClick={() => {
                // router.push("/leaderboard");
              }}
            >
              Leaderboard
            </a>
          </div>
          {loggedIn == true ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <Tooltip title="Account">
                  <div
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#54a542",
                      padding: "2px 5px",
                      borderRadius: "5px",
                    }}
                  >
                    <img
                      style={{ width: 40 }}
                      src="http://svgur.com/i/65U.svg"
                    ></img>
                    {"   "}
                    {JSON.parse(localStorage.user).username}
                  </div>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                // onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    // router.push("/dashboard");
                  }}
                >
                  <ListItemIcon>
                    {/* <DashboardIcon fontSize="small" /> */}
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <button className="started_btn" onClick={getStarted}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
