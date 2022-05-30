import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "./Header.css";
import Loader from "./Loader.js";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Header() {
  const [{ disease, crop, image, Action, email, user }, dispatch] =
    useStateValue();
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        console.log(re.user.email);
        dispatch({
          type: "EMAIL",
          email: re.user.email,
        });
        dispatch({
          type: "USER",
          user: re.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="header">
      <Link to="/home">
        <div className="header-title">
          <img src="leaf.svg" width="40px" alt="loading" />
          <b>Dr. Botany</b>
        </div>
      </Link>
      <div className="user-name">
        {email == null ? (
          <div className="google-btn" onClick={signIn}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        ) : (
          <Dropdown className="user-detail">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="toggle"
            >
              {/* <FontAwesomeIcon icon={faUser} /> */}
              <Avatar src={user?.photoURL} />
              <p className="user-displayname">{user?.displayName}</p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/history")}>
                History
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={() => navigate("/history")}>
                Home
              </Dropdown.Item> */}

              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: "EMAIL",
                    email: null,
                  });
                  navigate("/home");
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
export default Header;