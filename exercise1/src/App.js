import React, {Component} from 'react';
import './App.css';
import Table from "./components/Table"
/*
import axios from 'axios';
*/


class App extends Component {

    state = {
        items: []

    };

    componentDidMount() {


        const url = "http://media.mw.metropolia.fi/wbma/media/";

        fetch("http://media.mw.metropolia.fi/wbma/media")
            .then(res => res.json())
            .then((array) => {
                console.log(array);

                Promise.all(array.map(item => {
                    return fetch("http://media.mw.metropolia.fi/wbma/media/" + item.file_id)
                        .then(response => {
                        return response.json();
                    });
                })).then(items => {
                    this.setState({items:items});
                    console.log(url + items.file_id);
                });

            });


        /*        const id = picArray.file_id;

                const url = "http://media.mw.metropolia.fi/wbma/media/";


                axios.get("http://media.mw.metropolia.fi/wbma/media/")
                    .then(response =>
                        this.setState({picArray:response.data}));

                axios.get(url + id)
                    .then(response =>
                        this.setState({picArray:response.data}))


        /!*
                let arr = ["http://media.mw.metropolia.fi/wbma/media/"];
        *!/*/


    }

    render() {

        return (
            <div className="App">
                <table>

                    <Table items={this.state.items} />


                </table>


            </div>
        );
    }
}

export default App;