import React, {useState} from 'react';

const HeaderC = () => {

    const [active, setActive] = useState(false);

    let signClass = "";

    if(active === false){
        signClass = "sign-bg";
    }else{
        signClass = "sign-bg sign-active";
    }

    const signShow = (e) => {
        setActive(true);
    }

    const signNoShow = (e) => {
        setActive(false);
    }

    return(
        <div className="navbar-div">

            <div className={signClass} onClick={e => signNoShow()}>
                <div className="sign-content">
                    <h1 className="sign-header">Create Account</h1>
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
                        <span>Already have an account?<a href="">Sign In</a></span>
                    </div>
                </div>
            </div>

            <div className={signClass} onClick={e => signNoShow()}>
                <div className="sign-content">
                    <h1 className="sign-header">welcome</h1>
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
                        <a href=""><span>forgot password?</span></a>
                        <a href=""><span>create account</span></a>
                    </div>
                </div>
            </div>

            <div className={signClass} onClick={e => signNoShow()}>
                <div className="sign-content">
                    <h1 className="sign-header">Reset Password</h1>
                    <div className="sign-input">
                        <div className="forgot-input-div">
                            <input type="text" placeholder="Email"/>
                        </div>
                    </div>
                    <div>
                        <button>Send Reset Link</button>
                    </div>
                    <div className="sign-footer">
                        <span><a href="">Back to signin in</a></span>
                    </div>
                </div>
            </div>

            <div>
                <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
                <label className="nav-toggle-label">
                    <a className="menu-toggle"><h1>menu</h1></a>
                </label>
                <nav className="navbar">
                    <a href="/"><p className="nav-title">home</p></a>
                    <a href="/collection/comic"><p className="nav-title">store</p></a>
                    <a href="/about"><p className="nav-title">info</p></a>
                    <a href="/contact"><p className="nav-title">contact</p></a>
                    <p className="nav-title pointer" onClick={signShow}>sign in</p>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;