import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getOwner, getSingleMedia, getUser, getUserMedia, getUsername} from '../util/MediaAPI';
import {GridListTile} from "@material-ui/core";

class Single extends Component {
    mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
    state = {
        file: 'http://placekitten.com/200/200',
        filters: {
            brightness: 100,
            contrast: 100,
            warmth: 0,
            saturation: 100,
        },
        name: "",
        bool: false,
    };

    handleFileChange = (evt) => {
        /*source = https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL*/
        /*Image preview*/
        let reader = new FileReader();
        let previewFile = evt.target.files[0];
        let image = document.getElementById("target");


        if (previewFile.type === "image/jpeg" || previewFile.type === "image/png") {
            console.log("!");
            reader.readAsDataURL(previewFile);
            reader.addEventListener("load", function () {
                image.src = reader.result;
            }, false);
        } else {
            console.log("2");

            reader.readAsDataURL(previewFile);
            reader.addEventListener("load", function () {
                image.src = Image;
                console.log("ELSE")
            }, false);

        }

    };

    componentDidMount() {
        const {id} = this.props.match.params;
        getSingleMedia(id).then(pic => {
            console.log(pic);

            if (this.getFilters(pic.description) === undefined) {
                this.setState({
                    file: pic,
                    filters: "",
                });
            } else {
                this.setState({
                    file: pic,
                    filters: this.getFilters(pic.description),
                });
            }

        });
    }

    getFilters = (text) => {
        const pattern = '\\[f\\](.*?)\\[\\/f\\]';
        const re = new RegExp(pattern);
        console.log("FILTERS " + re.exec(text));
        try {
            return JSON.parse(re.exec(text)[1]);
        } catch (e) {
            console.log(e);
            return this.state.filters;
        }
    };

    getDescription = (text) => {
        const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
        const re = new RegExp(pattern);
        console.log("DESC " + re.exec(text));
        try {
            return re.exec(text)[1];
        } catch (e) {
            return text;
        }
    };

    getImageUserID = () => {
        console.log(this.state.file.description + " FILTERS");

        const UID = this.state.file.user_id;
        getOwner(UID, localStorage.getItem('token')).then((owner) => {
            this.setState({name: owner.username});
            console.log(this.state.name + " Nimi");
            console.log(owner + " Nimi");

            /*
                        return owner.username;
            */

        })


        /*        if (this.state.bool === false) {
                    this.setState({
                        bool: true,
                    });

                    setTimeout(() => {
                        getOwner(UID, localStorage.getItem('token')).then((owner) => {
                            this.setState({name: owner.username});
                            console.log(this.state.name + " Nimi");
                            console.log(owner + " Nimi");

                            return owner.username;

                        })
                    }, 3000);




                }*/

    };


    render() {
        return (
            <React.Fragment>
                <h1>{this.state.file.title}</h1>

                {(this.state.file.media_type === "image"
                    &&
                    <img src={this.mediaUrl + this.state.file.filename}
                         id={"target"}
                         alt={this.state.file.title}
                         style={{filter: `brightness(${this.state.filters.brightness}%) contrast(${this.state.filters.contrast}%) sepia(${this.state.filters.warmth}%) saturate(${this.state.filters.saturation}%)`}}
                    />)
                ||
                (this.state.file.media_type === "video"
                    &&
                    <video width="320" height="240" controls>
                        <source src={this.mediaUrl + this.state.file.filename} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                )
                ||
                (this.state.file.media_type === "audio"
                    &&
                    <audio controls>
                        <source src={this.mediaUrl + this.state.file.filename} type="audio/mpeg"/>
                        Your browser does not support the video tag.
                    </audio>
                )
                }


                <p>
                    Description: {this.getDescription(this.state.file.description)}
                </p>

                {/*                <p>
                    {this.getFilters(this.state.filters)}
                </p>*/}
                <p>
                    Filters: {JSON.stringify(this.state.filters)}
                </p>
                <p>
                    {this.getImageUserID(this.state.name)}
                </p>

                <p>
                    Uploader: {this.state.name}
                </p>
            </React.Fragment>
        );
    }

}

Single.propTypes = {
    match: PropTypes.object,
};

export default Single;