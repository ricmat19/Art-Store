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
                    <a href="/"><p class="nav-title">home</p></a>
                    <a href="/collection/comics"><p class="nav-title">store</p></a>
                    <a href="/about"><p class="nav-title">info</p></a>
                    <a href="/contact"><p class="nav-title">contact</p></a>
                    <a href=""><p class="nav-title">signin</p></a>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

export default HeaderC;