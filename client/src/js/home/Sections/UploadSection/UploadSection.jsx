import React, { Component } from "react";
import { filesService } from "src/js/services";

export class UploadSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  upload = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    this.setState({
      loading: true
    });
    await filesService.upload(formData);
    this.setState({
      loading: false
    });
    location.reload();
  };

  render() {
    return (
      <section className="home__upload-section">
        <form className="home-form" onSubmit={this.upload}>
          <input type="file" name="file" />
          <input type="submit" value="upload" />
        </form>
        {this.state.loading && <label>Loading...</label>}
      </section>
    );
  }
}
