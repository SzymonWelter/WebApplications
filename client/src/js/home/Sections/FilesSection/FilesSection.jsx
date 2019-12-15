import React, { Component } from "react";
import { filesService } from "src/js/services";
import { FileTile } from "./";

export class FilesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      files: []
    };
  }

  componentDidMount() {
    filesService.filesNames().then(result => {
      this.setState({ files: result });
    });
  }

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
    this.setState({ loading: true });
    await filesService.remove(name);
    this.setState({ loading: false });
    this.componentDidMount();
  };

  render() {
    return (
      <section className="home__files-section">
        <div className="container">
          <ul className="files-list">
            {this.state.files.map((file, index) => (
              <li className="files-list__item" key={index}>
                <FileTile
                  name={file}
                  onClick={this.download}
                  onRemove={this.remove}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}
