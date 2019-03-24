import React, {Component} from 'react';
import './App.css';
import Table from "./components/Table"
import axios from 'axios';


class App extends Component {

    state = {
        picArray: []

    };

    state2 = {
        picArray2: []

    };

        componentDidMount() {
        axios.get("http://media.mw.metropolia.fi/wbma/media")
            .then(response =>
                this.setState({picArray:response.data}));


            const url = "http://media.mw.metropolia.fi/wbma/media/1697";
            let arr = ["http://media.mw.metropolia.fi/wbma/media/"];


            Promise.all(arr.map(item => {
                return fetch(url ).
                then(response => {

                    return response.json();
                });
            })).then(items => {
                this.setState({picArray2:items.data})

                /*
                                console.log(url + items.file_id);
                */


                // save items to state
            });




    }

    render() {
        return (
            <div className="App">
                <table>

                    <Table picArray={this.state.picArray} picArray2={this.state2.picArray2}/>


                </table>


            </div>
        );
    }
}

export default App;
