import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Circle from '../util/LoadingCircle'
/*
import {handleRangeChange} from '../util/MediaAPI';
*/


const styles = theme => ({
    progress: {
        scale: theme.spacing.unit * 10,
    },
});

class Upload extends Component {
    mediaUrl = 'http://media.mw.metropolia.fi/wbma/';
    state = {
        file: {
            title: "",
            description: "",
            filedata: null,
            filename: undefined,
            imageURL: "",
        },
        loading: false,
        imagePreview: "",
    };

    handleRangeChange = (element) => {
        const filters = {
            brightness: 100,
            contrast: 100,
            warmth: 0,
            saturation: 100,
        };
        const image = document.querySelector('#target');


        console.log(element.value);
        filters[element.id] = element.value;
        image.style.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) sepia(${filters.warmth}%) saturate(${filters.saturation}%)`;
    };

    handleFileChange = (evt) => {
        /*source = https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL*/
        /*Image preview*/
        let reader = new FileReader();
        let previewFile = evt.target.files[0];
        let image = document.getElementById("target");


        if (previewFile.type === "image/jpeg" || previewFile.type === "image/png") {
            reader.readAsDataURL(previewFile);
            reader.addEventListener("load", function () {
                image.src = reader.result;
            }, false);
        } else {
            reader.readAsDataURL(previewFile);
            reader.addEventListener("load", function () {
                image.src = Image;
                console.log("ELSE")
            }, false);

        }

        evt.persist();
        console.log(evt.target.files[0]);
        this.setState((prevState) => ({
            file: {
                ...prevState.file,
                filedata: evt.target.files[0],

            },
        }));
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        console.log(value, name);

        this.setState((prevState) => ({
            file: {
                ...prevState.file,
                [name]: value,

            },
        }));

    };


    handleFileSubmit = (evt) => {
        console.log(evt);
        this.setState({loading: true});
        /*        this.setState({loading: !this.state.loading});*/
        const fd = new FormData();
        fd.append("title", this.state.file.title);
        fd.append("description", this.state.file.description);
        fd.append("file", this.state.file.filedata);

        const options = {
            method: 'POST',
            body: fd,
            headers: {
                'x-access-token': localStorage.getItem("token"),
            }
        };

        fetch(this.mediaUrl + "media", options).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            setTimeout(() => {

                this.setState({loading: false});
                this.props.history.push('/home');
                this.props.getMedia();
            }, 2000)

        })
    };


    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <h1>Upload</h1>
                <ValidatorForm instantValidate={false}
                               onSubmit={this.handleFileSubmit}
                               onError={errors => console.log(errors)}>
                    <TextValidator name="title" label="Title"
                                   value={this.state.file.title}
                                   onChange={this.handleInputChange}
                                   validators={['required', 'minStringLength:3']}
                                   errorMessages={['this field is required', 'minimum 3 charaters']}
                                   fullWidth/>

                    <TextValidator name="description" label="Description"
                                   value={this.state.file.description}
                                   onChange={this.handleInputChange}
                                   validators={['minStringLength:3']}
                                   errorMessages={['minimum 3 charaters']}
                                   fullWidth
                                   multiline
                                   rows={3}/>


                    <TextValidator name="filedata"
                                   value={this.state.file.filename}
                                   type="file"
                                   onChange={this.handleFileChange}
                        /*                                   validators={['required', 'allowedExtensions:image/jpg,image/png']}
                                                           errorMessages={['This field is required', 'Only media files']}*/
                                   fullWidth/>
                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.progress}>Upload&nbsp;{this.state.loading && <Circle/>}</Button>

                    <img src={""} id="target" height={500} alt={""}/>


                    {/*                    <div>
                        <input type="range" min="0" max="200" value="100" id="brightness"
                               onChange={this.handleRangeChange}/>
                    </div>
                    <div>
                        <input type="range" min="0" max="200" value="100" id="contrast"
                               onChange={this.handleRangeChange}/>
                    </div>
                    <div>
                        <input type="range" min="0" max="200" value="100" id="saturation"
                               onChange={this.handleRangeChange}/>
                    </div>
                    <div>
                        <input type="range" min="0" max="100" value="0" id="warmth"
                               onChange={this.handleRangeChange}/>
                    </div>*/}


                </ValidatorForm>


            </React.Fragment>


        );
    }
}

Upload.propTypes = {
    history: PropTypes.object,
    getMedia: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upload);
