import React, { Component } from 'react';
import { subscribeToAddSong } from '../../api';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import Icon from 'react-icons-kit';
import { check } from 'react-icons-kit/iconic/check';
import MusicBars from './music-bars';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Song extends Component {

    constructor(props) {
        super(props);

        this.state = {
            add: props.add,
            spinner: props.spinner,
            check: false
        };
    };

    _handleMessage = (message) => {
        if (message === 'success') {
            this.setState({
                spinner: false,
                check: true
            });
        };
    };

    _handleSongClick = (e, cb, type) => {
        if (type === 'add') {
            subscribeToAddSong(e.target.id, cb);
            this.setState({
                spinner: true,
                add: false
            });
        }
    };

    render() {

        let song = this.props.song;
        let result;

        if (song !== undefined)
        {
            result = (
                <div className='song-row'>
                    <div className='row'>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='col-12 song-title'>
                                    <span>
                                        { song.name }
                                    </span>
                                </div>
                            </div>
                            <div className='col-12 song-info-row'>
                                <span className='song-info'>
                                    { song.artists[0] }
                                </span>
                                <span className='song-info-seperator'>
                                    -
                                </span>
                                <span className='song-info'>
                                    { song.album }
                                </span>
                            </div>
                        </div>
                        <div className='col-2 song-status-icon'>
                            { this.state.add && <span id={ song.id } className="oi oi-plus" title="plus" aria-hidden="true" onClick={ (e) => this._handleSongClick(e, this._handleMessage, 'add') } /> }
                            <ClipLoader loading={ this.state.spinner } className={ override } sizeuUnit={ 'px' } color={'green'} size={ 30 } />
                            { this.state.check && <div className='check-icon-div'><Icon icon={ check } size={ 23 } /></div>}
                            { this.props.playing && <MusicBars /> }
                        </div>
                    </div>
                </div>
            );
        }
        else {
            result = null;
        }
        return result;
    }
};

export default Song;


/*
render() {

        let song = this.props.song;
        let result;

        if (song !== undefined)
        {
            result = (
                <div className='song-row'>
                    <div className='row'>
                        <div className='col-10 song-title'>
                            <span>
                                { song.name }
                            </span>
                        </div>
                        <div className='col-2'>
                            { this.state.add && <span id={ song.id } className="oi oi-plus" title="plus" aria-hidden="true" onClick={ (e) => this._handleSongClick(e, this._handleMessage, 'add') } /> }
                            <ClipLoader loading={ this.state.spinner } className={ override } sizeuUnit={ 'px' } color={'green'} size={ 15 } />
                            { this.state.check && <span id={ song.id } className="oi oi-check song-check" title="check" aria-hidden="true" /> }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 song-info-row'>
                            <span className='song-info'>
                                { song.artists[0] }
                            </span>
                            <span className='song-info-seperator'>
                                -
                            </span>
                            <span className='song-info'>
                                { song.album }
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            result = null;
        }
        return result;
    }
*/