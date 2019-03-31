// App.js
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {getAllMedia} from './utils/mediaAPI';
import Nav from "./components/Nav";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Single from "./views/Single";
import Login from "./views/Login";

class App extends Component {

    state = {
        picArray: [],
    };

    componentDidMount() {

        getAllMedia().then(pics => {
            this.setState({picArray: pics});
        });
    }

    render() {
        return (
            <Router>

                <div className="container">
                    <Nav />
                    <Route exact path={"/"} render={(props) => (
                        <Home {...props} picArray={this.state.picArray}/>
                    )}/>
                    <Route path={"/profile"} component={Profile}/>
                    <Route path={"/single/:id"} component={Single}/>
                    <Route path={"/Login"} component={Login}/>

                </div>

            </Router>
        );
    }
}

export default App;
