import React, { Component } from 'react';
import { searchSong } from '../../api';
import { expandPlaylist } from './playlist';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            results: '',
        };
    };

    changeSearchTerm = (searchTerm) => {
        this.setState({searchTerm});
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchSong(this.state.searchTerm, this.dispalyResults);
        };
    };

    dispalyResults = (results) => {
        let parsedResults = expandPlaylist(results, true);
        this.setState({results: parsedResults});
    };

    render() {
        return (
            <div>
                <form>
                    <input type='text' name='search' placeholder='Search' className='search-bar' onChange={ (e) => this.changeSearchTerm(e.target.value) } onKeyPress={ this.handleKeyPress } />
                    <span className="oi oi-magnifying-glass yolo" title="magnifying-glass" aria-hidden="true" onClick= { () => searchSong(this.state.searchTerm, this.dispalyResults) } ></span>
                    <div>
                        { this.state.results } 
                    </div>
                </form>
            </div>
        );
    };
};

export default Search;