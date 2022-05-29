import React from "react";
import "./Header.css";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Header() {
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        console.log(re);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="header">
      <div className="header-title">
        <b>Dr.botany</b>
      </div>
      <div className="user-name">
        <button onClick={signIn}>Sign in With Google</button>
      </div>
    </div>
  );
}
export default Header;
