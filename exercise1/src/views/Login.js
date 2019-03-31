import React, {Component} from 'react';
import {login, register} from "../utils/mediaAPI";

class Login extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        full_name: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            full_name: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        console.log(value, name);
        console.log(this.state);

        this.setState({
            [name]: value,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log('A name was submitted: ' + this.state.username);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                    <input type="text" name="username" placeholder="username"
                           value={this.state.username}
                           onChange={this.handleInputChange.bind(this)}/> <br/>
                    <input type="text" name="password" placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleInputChange.bind(this)}/> <br/>
                    <button type="submit" value="Submit" onClick={() => login(this.state.username, this.state.password)}/>
                    <br/>

                <h1>Register</h1>
                    <input type="text" name="username" placeholder="username"
                           value={this.state.username}
                           onChange={this.handleInputChange}/>
                    <br/>
                    <input type="text" name="password" placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleInputChange}/>
                    <br/>
                    <input type="text" name="email" placeholder="Email"
                           value={this.state.email}
                           onChange={this.handleInputChange}/>
                    <br/>
                    <input type="text" name="full_name" placeholder="Fullname"
                           value={this.state.full_name}
                           onChange={this.handleInputChange}/>
                    <br/>
                <button type="submit" value="Submit" onClick={() => register(this.state.username, this.state.password, this.state.email, this.state.full_name)}/>
            </div>


        );

    }

    /*
        const Login = (props) => {

        };*/


}


export default Login;
