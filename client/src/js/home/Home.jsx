import React, { Component } from "react";
import { HeaderSection, UploadSection, FilesSection } from './Sections';


export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderSection />
        <UploadSection />
        <FilesSection />
      </div>
    );
  }
}
