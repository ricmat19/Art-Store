import React from "react";
// import IndexAPI from "../../apis/indexAPI";

const HeaderC = () => {
  // const [signInModal, setSignInModal] = useState("modal-bg");
  // const [signupModal, setSignupModal] = useState("modal-bg");
  // const [resetModal, setResetModal] = useState("modal-bg");

  // const displaySignIn = () => {
  //   setSignInModal("modal-bg active");
  //   setSignupModal("modal-bg");
  //   setResetModal("modal-bg");
  // };

  // const displaySignup = () => {
  //   setSignupModal("modal-bg active");
  //   setSignInModal("modal-bg");
  //   setResetModal("modal-bg");
  // };

  // const displayReset = () => {
  //   setResetModal("modal-bg active");
  //   setSignupModal("modal-bg");
  //   setSignInModal("modal-bg");
  // };

  // const signInRef = useRef();
  // const signupRef = useRef();
  // const resetRef = useRef();

  // useEffect(() => {
  //   document.addEventListener("mousedown", (event) => {
  //     if (event.target !== null) {
  //       if (!signInRef.current.contains(event.target)) {
  //         setSignInModal("modal-bg");
  //       }
  //       if (!signupRef.current.contains(event.target)) {
  //         setSignupModal("modal-bg");
  //       }
  //       if (!resetRef.current.contains(event.target)) {
  //         setResetModal("modal-bg");
  //       }
  //     }
  //   });
  // }, []);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [rePassword, setRePassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  // const emailInput = useRef(null);
  // const passwordInput = useRef(null);
  // const firstNameInput = useRef(null);
  // const lastNameInput = useRef(null);
  // const rePasswordInput = useRef(null);

  // async (e) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.get("/signIn", {
  //       email: email,
  //       password: password,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.post("/signup", {
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //     });

  //     firstNameInput.current.value = "";
  //     lastNameInput.current.value = "";
  //     emailInput.current.value = "";
  //     passwordInput.current.value = "";
  //     rePasswordInput.current.value = "";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(e);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="navbar-div">
      {/* SignIn */}
      {/* <div className={signInModal}>
        <form>
          <div ref={signInRef} className="modal-content">
            <h1 className="header">welcome</h1>
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
      </div> */}

      {/* signup */}
      {/* <div className={signupModal}>
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
              >
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
      </div> */}

      {/* reset */}
      {/* <div className={resetModal}>
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
      </div> */}

      <div>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <div htmlFor="nav-toggle" className="nav-toggle-label">
          <a className="menu-toggle">
            <nav>
              <h1>
                <div className="logo">
                  <span className="logo-first">a</span>rt
                  <span className="logo-first">H</span>ouse
                </div>
              </h1>
            </nav>
          </a>
        </div>
        <nav className="navbar">
          <div className="logo-div">
            <div className="logo">
              <span className="logo-first">a</span>rt
              <span className="logo-first">H</span>ouse
            </div>
          </div>
          <div className="nav-div">
            {/* <a href="/admin/products/print">
            <h1>store</h1>
          </a> */}
            {/* <a href="/admin/about">
            <h1>info</h1>
          </a> */}
            {/* <a onClick={displaySignIn}>
            <h1 className="pointer">sign in</h1>
          </a> */}
          </div>
          <div className="cart-summary-div"></div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderC;
