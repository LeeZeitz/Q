import React from 'react';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="collapse navbar-collapse justify-content-center">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <span className="header-title">Q</span>
                </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;