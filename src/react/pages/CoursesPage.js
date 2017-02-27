import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Title from '../components/Title';
import Footer from '../components/Footer';
import ItemsPanel from '../components/ItemsPanel';
import renderModulePanel from '../components/renderModulePanel';

const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};

class Courses extends Component {
  renderListBody(body_params) {
    return (
      <rbs.Media>
       <rbs.Media.Left>
          <rbs.Image width={64} height={64} src={body_params['img']} rounded />
        </rbs.Media.Left>
        <rbs.Media.Body>
          <rbs.Media.Heading style={hiddenOverFlow}>{body_params['title']}</rbs.Media.Heading>
          <p style={{color:'grey'}}>{body_params['source']}</p>
        </rbs.Media.Body>
      </rbs.Media>
    );
  }

  renderItemPanel(course, communityById, handleThumbnailClick, url, handleButtonClick) {
    return renderModulePanel(course, 'Enroll Now', handleButtonClick, 'Course Channel', 'Course Description', communityById, 'Enrolled Scholars', handleThumbnailClick, url);
  }

  componentDidMount() {
    this.props.mount(this.props.isCoursesListViewable, this.props.currentVisibleCourse);
  }

  render() {
    return (
      <div className="courses">
        <Navbar items={[['Announcements','/announcements'], ['Courses','/courses'], ['Community','/community']]} />
        
        <Body>
          <Title>Courses</Title>

          <ItemsPanel 
            items={this.props.coursesById}
            otherItems={this.props.communityById}
            itemIds={this.props.coursesList} 
            isListViewable={this.props.isCoursesListViewable}
            currentVisible={this.props.currentVisibleCourse}
            handleListClick={this.props.handleListClick}
            handlePanelClick={this.props.handlePanelClick}
            handleThumbnailClick={this.props.handleThumbnailClick}
            handleButtonClick={this.props.handleButtonClick}
            url={'/community'}
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel}/>

        </Body>

        <Footer />
      </div>
    );
  }
}

Courses.propTypes = {
  isCoursesListViewable: PropTypes.bool.isRequired,
  currentVisibleCourse: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func.isRequired,
  coursesById: PropTypes.object.isRequired,
  coursesList: PropTypes.array.isRequired,
  communityById: PropTypes.object.isRequired
}

export default Courses;