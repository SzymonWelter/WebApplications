import React, { Component } from "react";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
  }
  getHeader() {
    if (this.props.error) return "Can not sign in";
    return "You are signed in!";
  }

  render() {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <h5 className="modal-title">{this.getHeader()}</h5>
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
