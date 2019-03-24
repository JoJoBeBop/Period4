import React, {Component} from 'react';
import PropTypes from "prop-types";

class Tableitem extends Component {
    render() {
        return (
            <tbody>
                <tr>
                    <td>
                        <img src={this.props.table.thumbnails.w160} alt={"KUVA"}/>
                    </td>
                    <td>

                    </td>
                    <td style={tableStyle}>
                        <h3>{ this.props.table.title }</h3>
                        <p>{ this.props.table.description }</p>
                    </td>
{/*                    <td>
                        <a href={this.props.table.filename}>View</a>
                    </td>*/}
                </tr>


            </tbody>

        );
    }
}

const tableStyle = {
    borderBottom: "2px solid black"
};

Tableitem.propTypes = {
    table: PropTypes.object.isRequired
};


export default Tableitem;