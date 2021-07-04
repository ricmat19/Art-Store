import React, {useState} from 'react';

const HeaderC = () => {

    const [active, setActive] = useState(false);

    let signinClass = "";

    if(active === false){
        signinClass = "signin-bg";
    }else{
        signinClass = "signin-bg signin-active";
    }

    const signinModal = (e) => {
        setActive(true);
    }

    return(
        <div className="navbar-div">
            <div className={signinClass}>
                <div className="signin-content">
                    <h1 className="signin-header">welcome</h1>
                    <div className="signin-input">
                        <div>
                            <input type="text" placeholder="Email"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Password"></input>
                        </div>
                    </div>
                    <div>
                        <button>sign in</button>
                    </div>
                    <div className="signin-footer">
                        <a href=""><span>forgot password?</span></a>
                        <a href=""><span>create account</span></a>
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
                    <a onClick={signinModal} href=""><p className="nav-title">signin</p></a>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;