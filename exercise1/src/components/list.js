import React, {Component} from 'react';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <img src="http://placekitten.com/160/160" alt="Title"/>
                        </td>
                        <td>
                            <h3>Title</h3>
                            <p>Lorem ipsum dolor sit amet...</p>
                        </td>
                        <td>
                            {/*
                            <a href="#">View</a>
*/}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
