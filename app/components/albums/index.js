import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Home from '../home';

class Albums extends Component {
    render() {
        const { albums, thumbnails, isLoggedIn } = this.props;

        return (
            <div>
                {
                    isLoggedIn ?
                        (
                            <div className="albums">
                                <ul>
                                    {
                                        albums && albums.map(row => {
                                            return (
                                                <li key={row.id}>
                                                    <div><img src={row.picture.data.url} height="80" /></div>
                                                    <div> <Link to={`/detail/${row.id}`}><h4>{row.name}</h4></Link></div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        )
                        :
                        (
                            <Home />
                        )
                }

            </div>
        )
    }
}

const mapStateToProps = ({ facebook }) => {
    return {
        isLoggedIn: facebook.isLoggedIn,
        albums: facebook.albums
    }
}
export default connect(mapStateToProps, null)(Albums);

