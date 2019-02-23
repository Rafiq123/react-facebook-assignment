import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel';

import { connect } from 'react-redux';
import UserProfile from '../userProfile';
import Home from '../home';

import './details.scss';


class Details extends Component {

    render() {
        const { match } = this.props
        const images = this.props.photos[match.params.id];
        let sliderImages = images.length && images.map(row => {
            return (
                <div>
                    <img src={row.images[0].source} width={row.images[0].width} />
                </div>
            )
        })
        let albumName = images && images.length && images[0].album.name;

        return (
            <div>
                <UserProfile showLogoutButton={false} >
                    <Link className="button" to={`/`}>Home</Link>
                </UserProfile>


                {
                    albumName ? (
                        <div className="detailsPanel">
                            <div className="album-details">
                                <div className="title">Album details</div>
                                <div>
                                    <strong>Name </strong> : <span>{albumName}</span>
                                </div>
                            </div>

                            <div className="photo-details">
                                <div className="title">Album Photos</div>
                                <Carousel>
                                    {sliderImages}
                                </Carousel>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}
const mapStateToProps = ({ facebook }) => {
    return {
        photos: facebook.photos,
    }
}

export default connect(mapStateToProps, null)(Details);
