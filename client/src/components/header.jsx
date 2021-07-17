import React, {useContext, useState, useRef} from 'react';
import CollectionAPI from "../apis/collectionAPI";
import {CollectionContext} from '../context/collectionContext';

const HeaderC = (props) => {

    const{createUser} = useContext(CollectionContext);

    const [signUpActive, setSignUpActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    const firstNameInput = useRef(null);
    const lastNameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const rePasswordInput = useRef(null);

    let signUpClass = "";

    if(signUpActive === false){
        signUpClass = "sign-bg";
    }else{
        signUpClass = "sign-bg sign-active";
    }

    const signUpShow = (e) => {
        setSignUpActive(true);
        // setSignInActive(false);
    }

    // const signUpNoShow = (e) => {
    //     setSignUpActive(false);
    // }

    
    const handleSignup = async (e) => {
        e.preventDefault()
        try{
         
            const response = await CollectionAPI.post("/signup", {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            })
            
            createUser(response.data.data.user);

            firstNameInput.current.value = "";
            lastNameInput.current.value = "";
            emailInput.current.value = "";
            passwordInput.current.value = "";
            rePasswordInput.current.value = "";

        }catch(err){
            console.log(err);
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        try{
         
            const request = await CollectionAPI.get("/signin", {
                email: email,
                password: password
            });

        }catch(err){
            console.log(err);
        }
    }  






    // const [signInActive, setSignInActive] = useState(false);
    // const [resetActive, setResetActive] = useState(false);

    // let signInClass = "";
    // let resetClass = "";



    // if(signInActive === false){
    //     signInClass = "sign-bg";
    // }else{
    //     signInClass = "sign-bg sign-active";
    // }

    // if(resetActive === false){
    //     resetClass = "sign-bg";
    // }else{
    //     resetClass = "sign-bg sign-active";
    // }



    // const signInShow = (e) => {
    //     setSignInActive(true);
    //     setSignUpActive(false);
    //     setResetActive(false);
    // }

    // const resetShow = (e) => {
    //     setResetActive(true);
    //     setSignInActive(false);
    // }

    // const signInNoShow = (e) => {
    //     setSignInActive(false);
    // }

    // const resetNoShow = (e) => {
    //     setResetActive(false);
    // }

    return(
        <div className="navbar-div">
 {/* onClick={e => signUpNoShow()} */}
            <form className={signUpClass}>
                <div className="sign-content">
                    <p className="sign-header title">Create Account</p>
                    <div className="sign-input">
                        <div className="name-input-div">
                            <input type="text" ref={firstNameInput} value={firstname} name="firstname" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}}/>
                            <input type="text" ref={lastNameInput} value={lastname} name="lastname" placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}}/>
                        </div>
                        <div className="modal-input-div">
                            <input type="email" ref={emailInput} value={email} name="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <div className="modal-input-div">
                            <input type="password" ref={passwordInput} value={password} name="password" placeholder="Create Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <div className="modal-input-div">
                            <input type="password" ref={rePasswordInput} value={rePassword} name="re-password" placeholder="Re-type Password" onChange={(e) => {setRePassword(e.target.value)}}/>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSignup} type="submit" className="btn form-button">Create Account</button>
                    </div>
                    <div className="sign-footer">
                    {/* onClick={e => signInShow()} */}
                    <a href=""><span>Already have an account?Sign In</span></a>
                    </div>
                </div>
            </form>

            {/* <form className={signInClass} onClick={e => signInNoShow()}>
                <div className="sign-content">
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
                        <a href="" onClick={e => signUpShow()}><span>forgot password?</span></a>
                        <a href="" onClick={e => resetShow()}><span>create account</span></a>
                    </div>
                </div>
            </form>

            <form className={resetClass} onClick={e => resetNoShow()}>
                <div className="sign-content">
                    <p className="sign-header title">Reset Password</p>
                    <div className="sign-input">
                        <div className="forgot-input-div">
                            <input type="text" placeholder="Email"/>
                        </div>
                    </div>
                    <div>
                        <button>Send Reset Link</button>
                    </div>
                    <div className="sign-footer">
                    <a href="" onClick={e => signInShow()}><span>Back to signin in</span></a>
                    </div>
                </div>
            </form> */}

            <div>
                <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
                <label className="title nav-toggle-label">
                    <a className="menu-toggle"><p className="title">menu</p></a>
                </label>
                <nav className="navbar">
                    <a href="/"><p className="title">home</p></a>
                    <a href="/collection/comic"><p className="title">store</p></a>
                    <a href="/about"><p className="title">info</p></a>
                    <a href="/contact"><p className="title">contact</p></a>
                    <p className="title pointer" onClick={signUpShow}>sign in</p>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;