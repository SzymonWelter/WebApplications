import React, { Component } from "react";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.getContent = this.getContent.bind(this);
  }
  getContent() {
    return "There is a problem with signing up. Check your connection or try again later.";
  }

  render() {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {this.getContent()}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
