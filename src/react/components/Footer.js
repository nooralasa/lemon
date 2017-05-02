/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 **/
import React, { Component } from 'react';

/** 
 * The Footer Component
 * This component renders the footer of the website
 **/
class Footer extends Component {
  /**
   * a function declaration that is called by React to render this component 
   * @return the footer of the page
   **/
  render() {
    return (   
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-inline">
                <li>
                  <a href="http://learn.media.mit.edu/"><i className="fa fa-building-o fa-fw" /> <span className="network-name">ML</span></a>
                </li>
                <li className="footer-menu-divider">⋅</li>
                <li>
                  <a href="mailto:learn@media.mit.edu"><i className="fa fa-envelope fa-fw" /> <span className="network-name">Email</span></a>
                </li>
                <li className="footer-menu-divider">⋅</li>
                <li>
                  <a href="https://www.facebook.com/mitmedialab/"><i className="fa fa-facebook fa-fw" /> <span className="network-name">Fb</span></a>
                </li>
              </ul>
              <p className="copyright text-muted small">Copyright © ML Learning 2017. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;