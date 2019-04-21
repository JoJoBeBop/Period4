import React, {Component} from 'react';
// import Table from '../components/Table';
import PropTypes from 'prop-types';
import ImageGrid from '../components/ImageGrid';
import {getUserMedia, deleteMedia} from '../util/MediaAPI';

class MyFiles extends Component {

    state = {
        picArray: [],
    };

    deleteFile = (id) => {
        console.log("delete", id);
        const deleteOK = window.confirm("Are you sure you want to delete?")
        if (!deleteOK) {
            return
        }
        //delete file
        deleteMedia(id, localStorage.getItem("token")).then(response => {
            this.updateImages()
        }).catch(err => {
            console.log(err)
        })
    };

    updateImages = () => {
        getUserMedia(localStorage.getItem('token')).then((pics) => {
            console.log(pics);
            this.setState({picArray: pics});
        });
    };

    componentDidMount() {
        this.updateImages();
    }

    render() {
        return (
            <React.Fragment>
                {/* <Table picArray={picArray}/> */}
                <ImageGrid picArray={this.state.picArray} edit={true} deleteFile={this.deleteFile}/>
            </React.Fragment>
        );
    }
}

MyFiles.propTypes = {
    picArray: PropTypes.array,
    edit: PropTypes.bool,
    deleteFile: PropTypes.func,
};

export default MyFiles;
