import React, { useState, useRef, useEffect } from "react";
// import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import IndexAPI from "../apis/indexAPI";
// import { CartContext } from "../context/CartContext";

const HeaderC = (props) => {
  const [signInModal, setSignInModal] = useState("modal-bg");
  const [signupModal, setSignupModal] = useState("modal-bg");
  const [resetModal, setResetModal] = useState("modal-bg");
  const [cartCount, setCartCount] = useState(0);

  const history = useHistory();

  const displaySignIn = () => {
    setSignInModal("modal-bg active");
    setSignupModal("modal-bg");
    setResetModal("modal-bg");
  };

  const displaySignup = () => {
    setSignupModal("modal-bg active");
    setSignInModal("modal-bg");
    setResetModal("modal-bg");
  };

  const displayReset = () => {
    setResetModal("modal-bg active");
    setSignupModal("modal-bg");
    setSignInModal("modal-bg");
  };

  const signInRef = useRef();
  const signupRef = useRef();
  const resetRef = useRef();

  // const { cart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (signInRef.current !== null) {
            if (!signInRef.current.contains(event.target)) {
              setSignInModal("modal-bg");
            }
            if (!signupRef.current.contains(event.target)) {
              setSignupModal("modal-bg");
            }
            if (!resetRef.current.contains(event.target)) {
              setResetModal("modal-bg");
            }
          }
        });

        const cartResponse = await IndexAPI.get(`/cart`);

        setCartCount(cartResponse.data.data.cart.length);
        // setCartCount(cart.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const passwordCopyInput = useRef(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/signIn", {
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordCopy: passwordCopy,
      });

      firstNameInput.current.value = "";
      lastNameInput.current.value = "";
      emailInput.current.value = "";
      passwordInput.current.value = "";
      passwordCopyInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  async (e) => {
    e.preventDefault();
    try {
      console.log("reset");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar-div">
      {/* SignIn */}
      <div className={signInModal}>
        <form>
          <div ref={signInRef} className="modal-content">
            <h1 className="header">welcome</h1>
            <div>
              <div className="modal-input-div">
                <input
                  type="email"
                  ref={emailInput}
                  value={email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="modal-input-div">
                <input
                  type="password"
                  ref={passwordInput}
                  value={password}
                  name="password"
                  placeholder="Create Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button onClick={handleSignIn}>sign in</button>
            </div>
            <div className="sign-footer">
              <div className="modal-link" onClick={displayReset}>
                <span>forgot password?</span>
              </div>
              <div className="modal-link" onClick={displaySignup}>
                <span>create account</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* signup */}
      <div className={signupModal}>
        <form>
          <div ref={signupRef} className="modal-content">
            <h1 className="header">Create Account</h1>
            <div>
              <div className="name-input-div">
                <input
                  type="text"
                  ref={firstNameInput}
                  value={firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  ref={lastNameInput}
                  value={lastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="modal-input-div">
                <input
                  type="email"
                  ref={emailInput}
                  value={email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="modal-input-div">
                <input
                  type="password"
                  ref={passwordInput}
                  value={password}
                  name="password"
                  placeholder="Create Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="modal-input-div">
                <input
                  type="password"
                  ref={passwordCopyInput}
                  value={passwordCopy}
                  name="re-password"
                  placeholder="Re-type Password"
                  onChange={(e) => {
                    setPasswordCopy(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button onClick={handleSignup} type="submit">
                Create Account
              </button>
            </div>
            <div className="sign-footer">
              <div className="modal-link" onClick={displaySignIn}>
                <span>Already have an account? Sign In</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* reset */}
      <div className={resetModal}>
        <form>
          <div ref={resetRef} className="modal-content">
            <h1 className="header">Reset Password</h1>
            <div className="forgot-input-div">
              <input type="text" placeholder="Email" />
            </div>
            <div>
              <button>Send Reset Link</button>
            </div>
            <div className="sign-footer">
              <div className="modal-link" onClick={displaySignIn}>
                <span>Back to sign in</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="nav-row">
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <a className="menu-toggle">
            <nav>
              <h1>menu</h1>
            </nav>
          </a>
        </label>
        <nav className="navbar">
          <div className="logo-div" onClick={() => history.push("/")}>
            <div className="logo">
              <span className="logo-first">a</span>rt
              <span className="logo-first">H</span>ouse
            </div>
          </div>
          <div className="nav-div">
            <div className="nav-link" onClick={() => history.push("/")}>
              <h1>store</h1>
            </div>
            <div className="nav-link" onClick={() => history.push("/about")}>
              <h1>about</h1>
            </div>
            <div className="nav-link" onClick={() => history.push("/contact")}>
              <h1>contact</h1>
            </div>
            {/* <div className="nav-link" href={value.toString()} onClick={displaySignIn}>
            <h1>sign in</h1>
            </div> */}
          </div>
          <div className="cart-summary-div">
            <div onClick={() => history.push("/cart")}>
              <h1 className="pointer">
                {cartCount} items <i className="fas fa-shopping-cart"></i>
              </h1>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

HeaderC.propTypes = {
  cartQty: PropTypes.string,
};

export default HeaderC;
