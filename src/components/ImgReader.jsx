import * as loadImage from 'blueimp-load-image';
import React, { Component } from 'react';

class ImgReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exifData: null,
            displayExif: false
        };
    }

    parseInfo(e) {
        let files = e.target.files;
        loadImage.parseMetaData(files[0], (data) => {
            if (data.exif) {
                this.setState({ exifData: data.exif.getAll(), displayExif: false });
            }
        });
    }

    handleSubmit = () => {
        // Check if the EXIF data contains 'Model' and if it is 'NIKON D5300'
        if (this.state.exifData && this.state.exifData.Model === 'NIKON D5300') {
            alert("You've found the image"); // Show an alert
        }
        this.setState({ displayExif: true });
    };    

    render() {
        return (
            <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
                <div className="mb-5">
                    <input type="file" className="block w-full text-sm text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        " onChange={(e) => this.parseInfo(e)} />
                </div>
                <div>
                    <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
                {this.state.displayExif && this.state.exifData ? (
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold mb-2">EXIF Data:</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(this.state.exifData).map(([key, value]) => (
                                <li key={key} className="text-sm text-gray-800">{`${key}: ${value}`}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ImgReader;
