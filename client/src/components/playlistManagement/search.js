import React, { Component } from 'react';
import { searchSong } from '../../api';

class Search extends Component {
    
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchSong(this.props.searchTerm, this.props.dispalyResults);
        };
    };

    render() {
        return (
            <div>
                <form>
                    <input value={ this.props.searchTerm } type='text' name='search' placeholder='Search' className='search-bar' autoComplete="off" onChange={ (e) => this.props.changeSearchTerm(e.target.value) } onKeyPress={ this._handleKeyPress } />
                    <span className="oi oi-magnifying-glass search-bar-icon" title="magnifying-glass" aria-hidden="true" onClick= { () => searchSong(this.props.searchTerm, this.props.dispalyResults) } ></span>
                    <div>
                        { this.props.results } 
                    </div>
                </form>
            </div>
        );
    };
};

export default Search;