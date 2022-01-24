import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import IndexAPI from "../apis/indexAPI";

const HeaderC = (props) => {
  const [signinModal, setSigninModal] = useState("sign-bg");
  const [signupModal, setSignupModal] = useState("sign-bg");
  const [resetModal, setResetModal] = useState("sign-bg");
  const [cartCount, setCartCount] = useState(0);

  const displaySignin = () => {
    setSigninModal("sign-bg sign-active");
    setSignupModal("sign-bg");
    setResetModal("sign-bg");
  };

  const displaySignup = () => {
    setSignupModal("sign-bg sign-active");
    setSigninModal("sign-bg");
    setResetModal("sign-bg");
  };

  const displayReset = () => {
    setResetModal("sign-bg sign-active");
    setSignupModal("sign-bg");
    setSigninModal("sign-bg");
  };

  const signinRef = useRef();
  const signupRef = useRef();
  const resetRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (signinRef.current !== null) {
            if (!signinRef.current.contains(event.target)) {
              setSigninModal("sign-bg");
            }
            if (!signupRef.current.contains(event.target)) {
              setSignupModal("sign-bg");
            }
            if (!resetRef.current.contains(event.target)) {
              setResetModal("sign-bg");
            }
          }
        });

        const cartResponse = await IndexAPI.get(`/cart`);

        setCartCount(cartResponse.data.data.cart.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const passwordCopyInput = useRef(null);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/signin", {
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
        firstname: firstname,
        lastname: lastname,
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
      {/* Signin */}
      <div className={signinModal}>
        <form>
          <div ref={signinRef} className="sign-content">
            <p className="sign-header title">welcome</p>
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
              <button onClick={handleSignin}>sign in</button>
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
          <div ref={signupRef} className="sign-content">
            <p className="sign-header title">Create Account</p>
            <div>
              <div className="name-input-div">
                <input
                  type="text"
                  ref={firstNameInput}
                  value={firstname}
                  name="firstname"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  ref={lastNameInput}
                  value={lastname}
                  name="lastname"
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
              <div className="modal-link" onClick={displaySignin}>
                <span>Already have an account? Sign In</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* reset */}
      <div className={resetModal}>
        <form>
          <div ref={resetRef} className="sign-content">
            <p className="sign-header title">Reset Password</p>
            <div className="forgot-input-div">
              <input type="text" placeholder="Email" />
            </div>
            <div>
              <button>Send Reset Link</button>
            </div>
            <div className="sign-footer">
              <div className="modal-link" onClick={displaySignin}>
                <span>Back to signin in</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="nav-row">
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="title">
          <a className="menu-toggle">
            <p className="title">menu</p>
          </a>
        </label>
        <nav className="navbar">
          <a className="logo-div" href="/">
            <p className="title">logo</p>
          </a>
          <div className="nav-div">
            <a className="nav-link" href="/">
              <p className="title">store</p>
            </a>
            {/* <a href="/#store">
            <p className="title">store</p>
          </a> */}
            <a className="nav-link" href="/about">
              <p className="title">about</p>
            </a>
            <a className="nav-link" href="/contact">
              <p className="title">contact</p>
            </a>
            {/* <a className="nav-link" href={value.toString()} onClick={displaySignin}>
            <p className="title">sign in</p>
            </a> */}
          </div>
          <div className="cart-summary-div">
            <a href="/cart">
              <p className="title pointer">
                {cartCount} items <i className="fas fa-shopping-cart"></i>
              </p>
            </a>
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
