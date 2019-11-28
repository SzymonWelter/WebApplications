import React, { Component } from "react";
import { filesService, authenticationService } from "src/js/services";
import { File } from "./";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
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
    this.componentDidMount();
  };

  download = async event => {
    const name = event.target.name;
    this.setState({ loading: true });

    const blob = await filesService.download(name);
    const url = window.URL.createObjectURL(new Blob([blob]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    this.setState({ loading: false });
  };

  remove = async event => {
    const name = event.target.name;
    this.setState({loading: true});
    await filesService.remove(name);
    this.setState({loading: false});
    this.componentDidMount();
  };

  logout = e => {
    authenticationService.logout();
    location.reload(true);
  };

  componentDidMount() {
    filesService.filesNames().then(result => {
      this.setState({ files: result });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Home page</h1>
          <button onClick={this.logout}>LogOut</button>
        </div>
        <form className="home-form" onSubmit={this.upload}>
          <input type="file" name="file" />
          <input type="submit" value="upload" />
        </form>
        {this.state.loading && <label>loading...</label>}
        {this.state.files.map((file, index) => (
          <File
            name={file}
            onClick={this.download}
            onRemove={this.remove}
            key={index}
          />
        ))}
      </div>
    );
  }
}
