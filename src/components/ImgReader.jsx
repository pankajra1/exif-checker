import * as loadImage from 'blueimp-load-image';
import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class ImgReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exifData: null,
            displayExif: false // Add this line to control the display of EXIF data
        };
    }

    parseInfo(e) {
        let files = e.target.files;
        loadImage.parseMetaData(files[0], (data) => {
            if (data.exif) {
                this.setState({ exifData: data.exif.getAll(), displayExif: false }); // Update this line to store all EXIF data
            }
        });
    }

    handleSubmit = () => {
        this.setState({ displayExif: true }); // Only set state to control the display
    };

    render() {
        return (
            <div>
                <div>
                    <Input type="file" onChange={(e) => this.parseInfo(e)} />
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </div>
                {this.state.displayExif && this.state.exifData ? ( // Check if displayExif and exifData are truthy
                    <div>
                        <h3>EXIF Data:</h3>
                        <ul>
                            {Object.entries(this.state.exifData).map(([key, value]) => (
                                <li key={key}>{`${key}: ${value}`}</li> // Render each EXIF data entry as a list item
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ImgReader;
