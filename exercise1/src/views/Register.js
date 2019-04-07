import React from 'react';
import PropTypes from 'prop-types';

function Register() {

    return (
        <React.Fragment>
            <h1>Logout</h1>
        </React.Fragment>
    );

}

Register.propTypes = {
    setUser: PropTypes.func,
    history: PropTypes.object,
};

export default Register;