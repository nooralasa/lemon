import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

class Body extends Component {
  render() {
    return (
      <div className="core">
        {this.props.children}
      </div>
    );
  }
}

export default Body;