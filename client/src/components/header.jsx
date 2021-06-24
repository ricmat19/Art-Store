import React from 'react';

const HeaderC = () => {
    return(
        <div>
            <div className="center">
                <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
                <label className="nav-toggle-label">
                    <a className="menu-toggle"><h1>menu</h1></a>
                </label>
                <nav className="navbar">
                    <a href="/"><h1>home</h1></a>
                    <a href="/collection/comics"><h1>store</h1></a>
                    <a href="/about"><h1>info</h1></a>
                    <a href="/contact"><h1>contact</h1></a>
                    <a href=""><h1>signin</h1></a>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;