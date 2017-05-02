/** 
 * React and React-Router Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 * @import browserHistory the urls that will be rendered in the browser
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import * as rbs from 'react-bootstrap/lib';

/** 
 * The Thumbnails List Component
 * Renders a module of thumbnails linking to an other item
 **/
class ThumbnailsList extends Component {
  /** 
   * Maps a list of ids to a thumbnails
   * @param list a list of ids of relevant items
   * @param items an object mapping the items by their id
   * @param url a string with the url that the thumbnails should link to
   * @return a list of thumbnails linking to other items
   **/
  renderThumbnails(list, items, url) {
    const listThumbnails = list.map((id) =>
      <td key={id}>
        <rbs.Thumbnail 
          key={id} 
          src={items[id]['body_params']['img']}
          style={{width: 150}}
          onClick={() => 
            {
              if (url) {
                browserHistory.push(url);
              }
              this.props.onUserClick(id);
            }
          }
        >
          <h5 key={id} style={{overflow: 'auto'}}>{items[id]['body_params']['title']}</h5>
        </rbs.Thumbnail>
      </td>
    );

    return (
      <rbs.Table responsive style={{borderCollapse:'collapse'}}>
        <tbody>
          <tr>
            {listThumbnails}
          </tr>
        </tbody>
      </rbs.Table>
    );
  }

  /**
   * a function declaration that is called by React to render this component 
   * @return a module with a list of thumbnails linking to other items
   **/
  render() {
    return (
      <div style={{marginTop:25, maxWidth:800}}>
        <p style={{textAlign: 'left'}}>{this.props.header}</p>
        <br/>
        {this.renderThumbnails(this.props.list, this.props.items, this.props.url)}
      </div>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
ThumbnailsList.propTypes = {
  header: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onUserClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired
}

export default ThumbnailsList;