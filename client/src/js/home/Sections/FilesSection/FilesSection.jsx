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
    filesService.getFiles().then(result => {
      this.setState({ files: result.files });
    });
  }

  download = async event => {
    const id = event.target.id;
    const name = event.target.name;
    this.setState({ loading: true });

    const blob = await filesService.download(id);
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
    const id = event.target.id;
    this.setState({ loading: true });
    await filesService.remove(id);
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
                  name={file.fileName}
                  id={file.fileId}
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
