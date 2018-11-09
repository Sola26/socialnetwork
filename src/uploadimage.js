import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import App from "./app";

export default class Uploadimage extends React.Component {
  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(e) {
    // console.log("this.props.uploaderIsVisible", this.props.uploaderIsVisible);
    var file = e.target.files[0];

    var formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData)
      .then(response => {
        console.log("RESPONSE DATA: ", response.data.image);
        this.props.setImage(response.data.image);
      })
      .catch(function(err) {
        console.log("ERROR IN UPLOAD", err.message);
      });
  }

  render() {
    return (
      <div>
        <div className="uploadimg">
          <p className="x" onClick={this.props.hideUploader}>
            &#10006;
          </p>
          <h3 className="updateyourpic">Update your picture</h3>

          <label htmlFor="file">
            <p className="upload">Upload a picture</p>
            <div className="uploadbutton">
              <input
                id="file"
                type="file"
                accept="image/*"
                name="file"
                onChange={this.uploadImage}
              />
            </div>
          </label>
        </div>
      </div>
    );
  }
}
