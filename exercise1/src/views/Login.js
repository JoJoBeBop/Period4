import React, {Component} from 'react';
import PropTypes from 'prop-types';
/*import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';*/
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import {login, register, getUser, checkAvailability, getProfileImage, getSingleMedia} from '../util/MediaAPI';

class Login extends Component {
    state = {
        user: {
            username: '',
            password: '',
            email: '',
            full_name: '',
        },
        toggleForm: true,
        userAvailable: true,
        registerVisible: "hidden",
        loginVisible: "visible",
        password2: "",
    };

    handleLoginSubmit = (evt) => {
        evt.preventDefault();
        this.doLogin();
    };

    handleRegisterSubmit = (evt) => {

        if (this.state.user.password === this.state.password2) {
            evt.preventDefault();
            register(this.state.user).then(user => {
                console.log(user);
                this.doLogin();
            });
        } else
            alert("Passwords don't match")
    };

    doCheckAvailability = (evt) => {
        const target = evt.target;
        const value = target.value;

        checkAvailability(value).then(response => {
            console.log(response.available);
            if (!response.available) {
                alert("Username taken")
            }
        })
    };

    doLogin = () => {
        login(this.state.user.username, this.state.user.password).then(response => {
            console.log(response);
            this.props.setUser(response.user);
            localStorage.setItem('token', response.token);
            this.props.history.push('/home');

            /*            if(!response.message) {
                            this.props.setUser(response.user);
                            localStorage.setItem('token', response.token);
                            this.props.history.push('/home');
                        } else {
                            alert(response.message);
                            console.log("PAKS")
                        }*/
        });
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        console.log(value, name);

        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value,
                },
            };
        });
    };

    handleInputChange2 = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        console.log(value, name);

        this.setState({
            password2: value

        });
    };


    componentDidMount() {
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token') !== null) {
            console.log(getSingleMedia(26));
            getUser(localStorage.getItem('token')).then(response => {
                this.props.setUser(response);
                this.props.history.push('/home');
            });
        }
    }

    /*Sets register/login styles to hidden or visible*/
    /*Definitely didn't spend way too much time on this*/
    registerClick = () => {
        console.log(getProfileImage());
        this.setState({
            registerVisible: "visible",
            loginVisible: "hidden"
        })
    };

    registerClick2 = () => {
        this.setState({
            registerVisible: "hidden",
            loginVisible: "visible"
        })
    };

    render() {
        return (
            <React.Fragment>
                <div id="loginDiv" style={{visibility: this.state.loginVisible}}>
                    <h1>Login</h1>

                    <ValidatorForm ref="form" onSubmit={this.handleLoginSubmit}>
                        <TextValidator
                            type="text"
                            name="username"
                            placeholder="username"
                            validators={['required', 'minStringLength:3']}
                            errorMessages={['this field is required', 'Not long enough']}
                            value={this.state.user.username}
                            onChange={this.handleInputChange}
                        />
                        <br/>
                        <TextValidator
                            type="password"
                            name="password"
                            placeholder="password"
                            validators={['required', 'minStringLength:5']}
                            errorMessages={['This field is required', 'Not long enough']}
                            value={this.state.user.password}
                            onChange={this.handleInputChange}/>
                        <br/>
                        <Button type="submit">Login</Button>
                    </ValidatorForm>

                </div>

                <button onClick={this.registerClick} style={{visibility: this.state.loginVisible}}>Not registered yet?
                </button>

                <div id="registerDiv" style={{visibility: this.state.registerVisible}}>
                    <h1>Register</h1>

                    <ValidatorForm ref="form" onSubmit={this.handleRegisterSubmit}>
                        <TextValidator
                            type="text"
                            name="username"
                            placeholder="username"
                            validators={['required', 'minStringLength:3']}
                            errorMessages={['this field is required', 'Not long enough']}
                            value={this.state.user.username}
                            onBlur={this.doCheckAvailability}
                            onChange={this.handleInputChange}/>
                        <br/>
                        <TextValidator
                            type="password"
                            name="password"
                            placeholder="password"
                            validators={['required', 'minStringLength:5']}
                            errorMessages={['This field is required', 'Not long enough']}
                            value={this.state.user.password}
                            onChange={this.handleInputChange}/>
                        <br/>
                        <TextValidator
                            type="password"
                            name="password"
                            placeholder="confirm password"
                            validators={['required', 'minStringLength:5']}
                            errorMessages={['This field is required', 'Not long enough']}
                            value={this.state.password2}
                            onChange={this.handleInputChange2}
                        />
                        <br/>
                        <TextValidator
                            type="email"
                            name="email"
                            placeholder="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            value={this.state.user.email}
                            onChange={this.handleInputChange}/>
                        <br/>
                        {/*full name is optional but should be validated if entered?*/}
                        <TextValidator
                            type="text"
                            name="full_name"
                            placeholder="full name"
                            value={this.state.user.full_name}
                            onChange={this.handleInputChange}/>
                        <br/>
                        <Button type="submit">Login</Button>
                    </ValidatorForm>

                    <button onClick={this.registerClick2} style={{visibility: this.state.registerVisible}}>Already have an account?
                    </button>

                </div>

            </React.Fragment>
        );
    }
}

const registerStyle = {
    visibility: "hidden",
    float:"right"
};

const loginStyle = {
    visibility: "visible",
    float:"left"
};

/*    render() {
        return (

                <React.Fragment>
                    <h1>Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                        <input type="text" name="username" placeholder="username"
                               value={this.state.user.username}
                               onChange={this.handleInputChange}/>
                        <br/>
                        <input type="password" name="password" placeholder="password"
                               value={this.state.user.password}
                               onChange={this.handleInputChange}/>
                        <br/>
                        <button type="submit">Login</button>
                    </form>

                    <button>
                        <Link to="/register">Not yet registered?</Link>
                    </button>



                    <h1>Register</h1>
                    <form onSubmit={this.handleRegisterSubmit}>
                        <input type="text" name="username" placeholder="username"
                               value={this.state.user.username}
                               onChange={this.handleInputChange} />
                        <br/>
                        <input type="password" name="password" placeholder="password"
                               value={this.state.user.password}
                               onChange={this.handleInputChange}/>
                        <br/>
                        <input type="email" name="email" placeholder="email"
                               value={this.state.user.email}
                               onChange={this.handleInputChange}/>
                        <br/>
                        <input type="text" name="full_name" placeholder="full name"
                               value={this.state.user.full_name}
                               onChange={this.handleInputChange}/>
                        <br/>
                        <button type="submit">Login</button>
                    </form>
                </React.Fragment>

        );
    }
}*/

Login.propTypes = {
    setUser: PropTypes.func,
    history: PropTypes.object,
};

export default Login;