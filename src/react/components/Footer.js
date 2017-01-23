import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (   
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-inline">
                <li>
                  <a href="https://www.media.mit.edu/"><i className="fa fa-building-o fa-fw" /> <span className="network-name">ML</span></a>
                </li>
                <li className="footer-menu-divider">⋅</li>
                <li>
                  <a href="mailto:nooralasa@gmail.com"><i className="fa fa-envelope fa-fw" /> <span className="network-name">Email</span></a>
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