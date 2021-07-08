import React, {useState} from 'react';

const HeaderC = () => {

    const [signUpActive, setSignUpActive] = useState(false);
    const [signInActive, setSignInActive] = useState(false);
    const [resetActive, setResetActive] = useState(false);

    let signInClass = "";
    let signUpClass = "";
    let resetClass = "";

    if(signUpActive === false){
        signUpClass = "sign-bg";
    }else{
        signUpClass = "sign-bg sign-active";
    }

    if(signInActive === false){
        signInClass = "sign-bg";
    }else{
        signInClass = "sign-bg sign-active";
    }

    if(resetActive === false){
        resetClass = "sign-bg";
    }else{
        resetClass = "sign-bg sign-active";
    }

    const signUpShow = (e) => {
        setSignUpActive(true);
        setSignInActive(false);
    }

    const signInShow = (e) => {
        setSignInActive(true);
        setSignUpActive(false);
        setResetActive(false);
    }

    const resetShow = (e) => {
        setResetActive(true);
        setSignInActive(false);
    }

    const signUpNoShow = (e) => {
        setSignUpActive(false);
    }

    const signInNoShow = (e) => {
        setSignInActive(false);
    }

    const resetNoShow = (e) => {
        setResetActive(false);
    }

    return(
        <div className="navbar-div">

            <div className={signUpClass} onClick={e => signUpNoShow()}>
                <div className="sign-content">
                    <p className="sign-header title">Create Account</p>
                    <div className="sign-input">
                        <div className="name-input-div">
                            <input type="text" placeholder="First Name"/>
                            <input type="text" placeholder="Last Name"/>
                        </div>
                        <div className="modal-input-div">
                            <input type="email" placeholder="Email"/>
                        </div>
                        <div className="modal-input-div">
                            <input type="password" placeholder="Create Password"/>
                        </div>
                        <div className="modal-input-div">
                            <input type="password" placeholder="Re-type Password"/>
                        </div>
                    </div>
                    <div>
                        <button>Create Account</button>
                    </div>
                    <div className="sign-footer">
                    <a href="" onClick={e => signInShow()}><span>Already have an account?Sign In</span></a>
                    </div>
                </div>
            </div>

            <div className={signInClass} onClick={e => signInNoShow()}>
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
            </div>

            <div className={resetClass} onClick={e => resetNoShow()}>
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
            </div>

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
                    <p className="title pointer" onClick={signInShow}>sign in</p>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;