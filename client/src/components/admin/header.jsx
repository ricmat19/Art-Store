import React, { useContext, useState, useRef, useEffect } from "react";
import CollectionAPI from "../../apis/collectionAPI";
import { CollectionContext } from "../../context/collectionContext";

const HeaderC = () => {
  const { createUser } = useContext(CollectionContext);

  const [signinModal, setSigninModal] = useState("sign-bg");
  const [signupModal, setSignupModal] = useState("sign-bg");
  const [resetModal, setResetModal] = useState("sign-bg");

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
    document.addEventListener("mousedown", (event) => {
      if (event.target !== null) {
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
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const rePasswordInput = useRef(null);

  async (e) => {
    e.preventDefault();
    try {
      await CollectionAPI.get("/signin", {
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
      const response = await CollectionAPI.post("/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });

      createUser(response.data.data.user);

      firstNameInput.current.value = "";
      lastNameInput.current.value = "";
      emailInput.current.value = "";
      passwordInput.current.value = "";
      rePasswordInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  async (e) => {
    e.preventDefault();
    try {
      console.log(e);
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
                <input type="text" placeholder="Email"></input>
              </div>
              <div className="modal-input-div">
                <input type="text" placeholder="Password"></input>
              </div>
            </div>
            <div>
              <button>sign in</button>
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
            <div className="sign-input">
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
                  ref={rePasswordInput}
                  value={rePassword}
                  name="re-password"
                  placeholder="Re-type Password"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSignup}
                type="submit"
                className="btn form-button"
              >
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
            <div className="sign-input">
              <div className="forgot-input-div">
                <input type="text" placeholder="Email" />
              </div>
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

      <div>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="title nav-toggle-label">
          <a className="menu-toggle">
            <p className="title">menu</p>
          </a>
        </label>
        <nav className="navbar">
          <a href="/admin/home">
            <p className="title">home</p>
          </a>
          <a href="/admin/collection/2D">
            <p className="title">store</p>
          </a>
          <a href="/admin/about">
            <p className="title">info</p>
          </a>
          <div onClick={displaySignin}>
            <p className="title pointer">sign in</p>
          </div>
        </nav>
      </div>
      <hr />
    </div>
  );
};

export default HeaderC;
