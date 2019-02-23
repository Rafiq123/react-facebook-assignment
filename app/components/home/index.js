import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLoginButton from '../facebookLoginButton/facebookLoginButton';
import UserProfile from '../userProfile';
import Albums from '../albums';

import { login, updateFBProfilePicture, updateAlbums, updatePhotos } from '../../actions/facebook';
import './home.scss';

class Home extends Component {

    componentDidMount() {
        document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    }

    initializeFacebookLogin = () => {
        this.FB = window.FB;
    }

    fetchAllPhotos = (album) => {
        const { updatePhotos, photos } = this.props;
        this.FB.api(`/${album.id}/photos?fields=picture,images,album,name`,
            'GET',
            { "redirect": "false" },
            function (response) {
                updatePhotos(
                    { "id": album.id, "value": response.data }
                );
            }
        );
    }

    fetchAlbums = (user) => {
        const { updateAlbums } = this.props;
        const fetchAllPhotos = this.fetchAllPhotos;
        this.FB.api(`/${user.id}/albums?fields=picture,images,name`,
            function (response) {
                if (response && !response.error) {
                    response.data.forEach(function (val, index) {
                        fetchAllPhotos(val)
                    });
                    updateAlbums(response.data);
                }
            }
        );
    }

    fetchProfilePicture = (user) => {
        const { updateFBProfilePicture } = this.props;
        this.FB.api(`/${user.id}/picture`,
            'GET',
            { "redirect": "false" },
            function (response) {
                updateFBProfilePicture(response.data.url);
            }
        );
    }

    onFacebookLogin = (loginStatus, resultObject) => {
        if (loginStatus === true) {
            this.fetchProfilePicture(resultObject.user);
            this.fetchAlbums(resultObject.user);
            this.props.login({
                isLoggedIn: true,
                username: resultObject.user.name
            });
        } else {
            this.props.login({
                isLoggedIn: false,
                username: undefined
            });
        }
    }

    handleLogout = () => {
        window.FB.logout();
        this.props.login({
            isLoggedIn: false,
            username: undefined
        });
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <div>
                <div className="App-intro">
                    {!isLoggedIn &&
                        <div className="vertical-center">
                            <h1>Welcome to React and facebook intigration assignment</h1>
                            <FacebookLoginButton onLogin={this.onFacebookLogin} >
                                <button className={`loginBtn loginBtn--facebook`}>
                                    Login with Facebook
                                </button>
                            </FacebookLoginButton>
                        </div>
                    }
                    {isLoggedIn &&
                        (
                            <div>
                                <UserProfile onLogout={this.handleLogout} showLogoutButton="true" />
                                <Albums />

                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ facebook }) => {
    return {
        isLoggedIn: facebook.isLoggedIn,
        photos : facebook.photos
    }
}
export default connect(mapStateToProps, { login, updateFBProfilePicture, updateAlbums, updatePhotos })(Home);
