import React, {Component} from 'react';
import './App.css';
import Table from "./components/Table"

class App extends Component {

    state = {
        picArray: []

    };



    componentDidMount() {
        fetch("./test.json")
            .then(response => response.json())
            .then(data => this.setState({ picArray: data.picArray }));
            /*.then(json => this.setState({json}));*/
    }


    render() {
        return (
            <div className="App">
                <table>

                    <Table picArray={this.state.picArray}/>


                </table>


            </div>
        );
    }
}

export default App;
