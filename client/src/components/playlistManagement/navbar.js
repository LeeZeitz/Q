import React from 'react';

const Navbar = (props) => {

    return (
        <div className='footer'>
            <div className='row footer-row'>
                <div className= { props.tab === 'playlist' ? 'col-6 nav-button selected' : 'col-6 nav-button' } onClick={ () => props.onToggleTab('playlist') } >
                    <span>
                        Playlist
                    </span>
                </div>
                <div className={ props.tab === 'search' ? 'col-6 nav-button selected' : 'col-6 nav-button' } onClick={ () => props.onToggleTab('search') } >
                    <span>
                        Search
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;