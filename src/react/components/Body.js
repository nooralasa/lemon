import React, { Component, PropTypes } from 'react';

class Body extends Component {
  render() {
    return (
      <div className="core">
        {this.props.children}
      </div>
    );
  }
}

Body.propTypes = {
	children: PropTypes.node.isRequired
}



export default Body;