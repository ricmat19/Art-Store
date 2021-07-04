import React from 'react';

const HeaderC = () => {
    return(
        <div className="navbar-div">
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
                    <a href=""><p className="nav-title">signin</p></a>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;