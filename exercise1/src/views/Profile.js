import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Profile = (props) => {
    const {username, email, full_name} = props.user;
    return (
        <React.Fragment>
            <h1>Profile</h1>
            {/*
            <img src={profile_pic} alt="username"/>
*/}
            <p>Username: {username}</p>
            <p>email: {email}</p>
            <p>Full name: {full_name}</p>
            <br/>


            <button><Link to="/logout">Logout</Link></button>


        </React.Fragment>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
};

export default Profile;