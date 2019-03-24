//This is a class based component like app.js
import React, {Component} from 'react';
import Tableitem from "./Tableitem"
import Tablebody from "./Tablebody"

import PropTypes from "prop-types";

class Table extends Component {

    render() {
        console.log(this.props.items);

        return this.props.items.map ((table, i) => (
            //            <h3> { table.title }</h3>
            <Tableitem key={i} table={table}/>

        ));


    }
}

Table.propTypes = {
    table: PropTypes.array.isRequired
};

export default Table;

/*//This is a class based component like app.js
import React, {Component} from 'react';
import PropTypes from "prop-types";
import Tablebody from "./Tablebody"


class Table extends Component {

    render() {
        return(
            <table>
                <Tablebody />
            </table>
        )
    }
}

Table.propTypes = {
    table: PropTypes.array.isRequired
};

export default Table;
*/


