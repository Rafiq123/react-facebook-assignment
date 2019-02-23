import React, { Component } from 'react'
import { connect } from 'react-redux';
import Home from '../home/index';

import './userProfile.scss';
class UserProfile extends Component {

    render() {
        const { onLogout, isLoggedIn, profilePicture, username, showLogoutButton } = this.props;
        return (
            <div>
                {
                    isLoggedIn &&

                    (<div className="user-profile">
                        <div><img src={profilePicture} height="80" /></div>
                        <div>
                            <h2>Welcome back, {username}</h2>
                            {this.props.children}
                            {
                                showLogoutButton && (
                                    <button className={`loginBtn loginBtn--facebook`} onClick={onLogout}>
                                        Logout
                                    </button>
                                )
                            }

                        </div>
                    </div>)
                }
                {
                    !isLoggedIn && <Home />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ facebook }) => {
    return {
        isLoggedIn: facebook.isLoggedIn,
        username: facebook.username,
        profilePicture: facebook.profilePicture,
    }
}

export default connect(mapStateToProps, {})(UserProfile);
