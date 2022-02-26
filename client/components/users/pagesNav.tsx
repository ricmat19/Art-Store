// import { useState, useRef } from "react";
// import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChalkboardTeacher,
  faStoreAlt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
// import { CartContext } from "../context/CartContext";

const PagesNav = () => {
  // const [signinModal, setSigninModal] = useState<string>("modal-bg");
  // const [signupModal, setSignupModal] = useState<string>("modal-bg");
  // const [resetModal, setResetModal] = useState<string>("modal-bg");

  const router = useRouter();

  // const displaySignin = () => {
  //   setSigninModal("modal-bg active");
  //   setSignupModal("modal-bg");
  //   setResetModal("modal-bg");
  // };

  // const displaySignup = () => {
  //   setSignupModal("modal-bg active");
  //   setSigninModal("modal-bg");
  //   setResetModal("modal-bg");
  // };

  // const displayReset = () => {
  //   setResetModal("modal-bg active");
  //   setSignupModal("modal-bg");
  //   setSigninModal("modal-bg");
  // };

  // const signinRef = useRef();
  // const signupRef = useRef();
  // const resetRef = useRef();

  // const { cart } = useContext(CartContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // document.addEventListener("mousedown", (event) => {
  //       //   if (signinRef.current !== null) {
  //       //     if (!signinRef.current.contains(event.target)) {
  //       //       setSigninModal("modal-bg");
  //       //     }
  //       //     if (!signupRef.current.contains(event.target)) {
  //       //       setSignupModal("modal-bg");
  //       //     }
  //       //     if (!resetRef.current.contains(event.target)) {
  //       //       setResetModal("modal-bg");
  //       //     }
  //       //   }
  //       // });

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [props]);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordCopy, setPasswordCopy] = useState("");
  // const [firstname, setFirstName] = useState("");
  // const [lastname, setLastName] = useState("");

  // const emailInput = useRef(null);
  // const passwordInput = useRef(null);
  // const firstNameInput = useRef(null);
  // const lastNameInput = useRef(null);
  // const passwordCopyInput = useRef(null);

  // const handleSignin = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.post("/signin", {
  //       email: email,
  //       password: password,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSignup = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.post("/signup", {
  //       firstname: firstname,
  //       lastname: lastname,
  //       email: email,
  //       password: password,
  //       passwordCopy: passwordCopy,
  //     });

  //     // firstNameInput.current.value = "";
  //     // lastNameInput.current.value = "";
  //     // emailInput.current.value = "";
  //     // passwordInput.current.value = "";
  //     // passwordCopyInput.current.value = "";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log("reset");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <nav>
        <Grid container sx={{ pt: "5px", pb: "5px", justifyContent: "center" }}>
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faStoreAlt} />
            </Grid>
            <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
              <Grid
                className="nav-link"
                onClick={() => router.push("/products/print")}
              >
                <h1 className="pointer">store</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faChalkboardTeacher} />
            </Grid>
            <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
              <Grid
                className="nav-link"
                onClick={() => router.push("/courses/drawing")}
              >
                <h1 className="pointer">courses</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faTv} />
            </Grid>
            <Grid
              className="nav-link"
              onClick={() => router.push("/media/blog")}
            >
              <h1 className="pointer">media</h1>
            </Grid>
          </Grid>
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <FontAwesomeIcon icon={faPaintBrush} />
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/projects">
                <h1 className="pointer">projects</h1>
              </a>
            </Grid>
          </Grid> */}
          <Grid container xs={3} sx={{ justifyContent: "center" }}>
            <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
              <FontAwesomeIcon icon={faCalendarCheck} />
            </Grid>
            <Grid className="nav-link" onClick={() => router.push("/events")}>
              <h1 className="pointer">events</h1>
            </Grid>
          </Grid>
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <FontAwesomeIcon icon={faComments} />
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/threads">
                <h1 className="pointer">community</h1>
              </a>
            </Grid>
          </Grid> */}
        </Grid>
      </nav>
      <hr />
    </header>

    // <Grid className="navbar-div">
    //   {/* Signin */}
    //   <Grid className={signinModal}>
    //     <form>
    //       <Grid
    //         // ref={signinRef}
    //         className="modal-content"
    //       >
    //         <h1 className="header">welcome</h1>
    //         <Grid>
    //           <Grid className="modal-input-div">
    //             <input
    //               type="email"
    //               ref={emailInput}
    //               value={email}
    //               name="email"
    //               placeholder="Email"
    //               onChange={(e) => {
    //                 setEmail(e.target.value);
    //               }}
    //             />
    //           </Grid>
    //           <Grid className="modal-input-div">
    //             <input
    //               type="password"
    //               ref={passwordInput}
    //               value={password}
    //               name="password"
    //               placeholder="Create Password"
    //               onChange={(e) => {
    //                 setPassword(e.target.value);
    //               }}
    //             />
    //           </Grid>
    //         </Grid>
    //         <Grid>
    //           <button onClick={handleSignin}>sign in</button>
    //         </Grid>
    //         <Grid className="sign-footer">
    //           <Grid className="modal-link" onClick={displayReset}>
    //             <span>forgot password?</span>
    //           </Grid>
    //           <Grid className="modal-link" onClick={displaySignup}>
    //             <span>create account</span>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Grid>

    //   {/* signup */}
    //   <Grid className={signupModal}>
    //     <form>
    //       <Grid
    //         // ref={signupRef}
    //         className="modal-content"
    //       >
    //         <h1 className="header">Create Account</h1>
    //         <Grid>
    //           <Grid className="name-input-div">
    //             <input
    //               type="text"
    //               ref={firstNameInput}
    //               value={firstname}
    //               name="firstname"
    //               placeholder="First Name"
    //               onChange={(e) => {
    //                 setFirstName(e.target.value);
    //               }}
    //             />
    //             <input
    //               type="text"
    //               ref={lastNameInput}
    //               value={lastname}
    //               name="lastname"
    //               placeholder="Last Name"
    //               onChange={(e) => {
    //                 setLastName(e.target.value);
    //               }}
    //             />
    //           </Grid>
    //           <Grid className="modal-input-div">
    //             <input
    //               type="email"
    //               ref={emailInput}
    //               value={email}
    //               name="email"
    //               placeholder="Email"
    //               onChange={(e) => {
    //                 setEmail(e.target.value);
    //               }}
    //             />
    //           </Grid>
    //           <Grid className="modal-input-div">
    //             <input
    //               type="password"
    //               ref={passwordInput}
    //               value={password}
    //               name="password"
    //               placeholder="Create Password"
    //               onChange={(e) => {
    //                 setPassword(e.target.value);
    //               }}
    //             />
    //           </Grid>
    //           <Grid className="modal-input-div">
    //             <input
    //               type="password"
    //               ref={passwordCopyInput}
    //               value={passwordCopy}
    //               name="re-password"
    //               placeholder="Re-type Password"
    //               onChange={(e) => {
    //                 setPasswordCopy(e.target.value);
    //               }}
    //             />
    //           </Grid>
    //         </Grid>
    //         <Grid>
    //           <button onClick={handleSignup} type="submit">
    //             Create Account
    //           </button>
    //         </Grid>
    //         <Grid className="sign-footer">
    //           <Grid className="modal-link" onClick={displaySignin}>
    //             <span>Already have an account? Sign In</span>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Grid>

    //   {/* reset */}
    //   <Grid className={resetModal}>
    //     <form>
    //       <Grid
    //         // ref={resetRef}
    //         className="modal-content"
    //       >
    //         <h1 className="header">Reset Password</h1>
    //         <Grid className="forgot-input-div">
    //           <input type="text" placeholder="Email" />
    //         </Grid>
    //         <Grid>
    //           <button>Send Reset Link</button>
    //         </Grid>
    //         <Grid className="sign-footer">
    //           <Grid className="modal-link" onClick={displaySignin}>
    //             <span>Back to signin in</span>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Grid>

    //   <Grid className="nav-row">
    //     <input type="checkbox" id="nav-toggle" className="nav-toggle" />
    //     <label htmlFor="nav-toggle" className="nav-toggle-label">
    //       <a className="menu-toggle">
    //         <nav>
    //           <h1>menu</h1>
    //         </nav>
    //       </a>
    //     </label>
    //     <nav className="navbar">
    //       <Grid className="logo-div" onClick={() => router.push("/")}>
    //         <Grid className="logo">
    //           <span className="logo-first">a</span>rt
    //           <span className="logo-first">H</span>ouse
    //           <span className="logo-first">19</span>
    //         </Grid>
    //       </Grid>
    //       <Grid className="nav-div">
    //         <Grid className="nav-link" onClick={() => router.push("/")}>
    //           <h1>store</h1>
    //         </Grid>
    //         <Grid container xs={3} sx={{ justifyContent: "center" }}>
    //           <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
    //             <FontAwesomeIcon icon={faChalkboardTeacher} />
    //           </Grid>
    //           <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
    //             <a href="/courses/drawing">
    //               <h1 className="pointer">courses</h1>
    //             </a>
    //           </Grid>
    //           <Grid container xs={3} sx={{ justifyContent: "center" }}>
    //             <Grid
    //               sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}
    //             >
    //               <FontAwesomeIcon icon={faTv} />
    //             </Grid>
    //             <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
    //               <a href="/medias/blog">
    //                 <h1 className="pointer">media</h1>
    //               </a>
    //             </Grid>
    //           </Grid>
    //         </Grid>
    //         <Grid container xs={3} sx={{ justifyContent: "center" }}>
    //           <Grid sx={{ textAlign: "center", alignSelf: "center", m: "5px" }}>
    //             <FontAwesomeIcon icon={faCalendarCheck} />
    //           </Grid>
    //           <Grid sx={{ textAlign: "center", alignSelf: "center" }}>
    //             <a href="/events">
    //               <h1 className="pointer">events</h1>
    //             </a>
    //           </Grid>
    //         </Grid>
    //         {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
    //         <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
    //           <FontAwesomeIcon icon={faComments} />
    //         </Grid>
    //         <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
    //           <a href="/threads">
    //             <h1 className="pointer">community</h1>
    //           </a>
    //         </Grid>
    //       </Grid> */}
    //         <Grid className="nav-link" onClick={() => router.push("/about")}>
    //           <h1>about</h1>
    //         </Grid>
    //         <Grid className="nav-link" onClick={() => router.push("/contact")}>
    //           <h1>contact</h1>
    //         </Grid>
    //         {/* <Grid className="nav-link" href={value.toString()} onClick={displaySignin}>
    //         <h1>sign in</h1>
    //         </Grid> */}
    //       </Grid>
    //       <Grid className="cart-summary-div">
    //         <Grid onClick={() => router.push("/cart")}>
    //           <h1 className="pointer">
    //             {cartCount} items
    //             <FontAwesomeIcon
    //               className="fab fa-youtube youtube-logo"
    //               icon={faShoppingCart}
    //             />
    //           </h1>
    //         </Grid>
    //       </Grid>
    //     </nav>
    //   </Grid>
    // </Grid>
  );
};

export default PagesNav;
