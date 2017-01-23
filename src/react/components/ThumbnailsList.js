import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

class ThumbnailsList extends Component {
  renderThumbnails(list, items, idToIndex) {
    const listThumbnails = list.map((id) =>
      <td>
        <rbs.Thumbnail 
          key={id} 
          src={items[idToIndex[id]]['body_params']['img']}
          style={{width: '150'}}
          onClick={() => {console.log("Hello")}}
        >
          <h5 style={{overflow: 'auto'}}>{items[idToIndex[id]]['body_params']['title']}</h5>
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
      <rbs.Panel style={{marginTop:'25'}}>
        <p style={{textAlign: 'left'}}>{this.props.header}</p>
        <br/>
        {this.renderThumbnails(this.props.list, this.props.items, this.props.idToIndex)}
      </rbs.Panel>
    );
  }
}

export default ThumbnailsList;