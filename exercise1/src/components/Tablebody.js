//This is a class based component like app.js
import React, {Component} from 'react';
import PropTypes from "prop-types";
import Tableitem from "./Tableitem"


class Tablebody extends Component {

    render() {
/*        return(
            <tbody>
            <Tableitem />
            </tbody>
        )*/
        return this.props.picArray.map ((table, i) => (
            //            <h3> { table.title }</h3>
            <Tableitem key={i} table={table}/>

        ));
    }
}

Tablebody.propTypes = {
    table: PropTypes.array.isRequired
};

export default Tablebody;
