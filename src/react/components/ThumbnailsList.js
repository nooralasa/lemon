import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';

class ThumbnailsList extends Component {
  renderThumbnails(list, items, url) {
    const listThumbnails = list.map((id) =>
      <td key={id}>
        <rbs.Thumbnail 
          key={id} 
          src={items[id]['body_params']['img']}
          style={{width: 150}}
          onClick={() => 
            {
              browserHistory.push(url);
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

  render() {
    return (
      <rbs.Panel style={{marginTop:25}}>
        <p style={{textAlign: 'left'}}>{this.props.header}</p>
        <br/>
        {this.renderThumbnails(this.props.list, this.props.items, this.props.url)}
      </rbs.Panel>
    );
  }
}

ThumbnailsList.propTypes = {
  header: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onUserClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired
}

export default ThumbnailsList;