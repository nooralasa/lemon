import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Title from '../components/Title';
import Footer from '../components/Footer';
import ItemsPanel from '../components/ItemsPanel';
import renderModulePanel from '../components/renderModulePanel';

const idToIndex = {
  1: 0,
  2: 1,
  3: 2,
  4: 3
}

const courses = [
  { 
    id: 1,
    body_params: {
      title: 'Machine Learning',
      source: 'Coursera',
      link: 'https://www.coursera.org/learn/machine-learning',
      img: '/styles/img/courses/1.jpeg',
      list: [1, 2, 3, 4],
      description: "Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself. More importantly, you'll learn about not only the theoretical underpinnings of learning, but also gain the practical know-how needed to quickly and powerfully apply these techniques to new problems. Finally, you'll learn about some of Silicon Valley's best practices in innovation as it pertains to machine learning and AI.\n\nThis course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). (iii) Best practices in machine learning (bias/variance theory; innovation process in machine learning and AI). The course will also draw from numerous case studies and applications, so that you'll also learn how to apply learning algorithms to building smart robots (perception, control), text understanding (web search, anti-spam), computer vision, medical informatics, audio, database mining, and other areas."
    } 
  },
  { 
    id: 2,
    body_params: {
      title: 'Programming for Everybody (Getting Started with Python)',
      source: 'Coursera',
      link: 'https://www.coursera.org/learn/python',
      img: '/styles/img/courses/2.jpeg',
      list: [1, 2, 3, 4],
      description: "This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python.  The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course. This course will cover Chapters 1-5 of the textbook “Python for Informatics”.   This course is equivalent to the first half of the 11-week 'Programming for Everybody (Python)' course.  Once a student completes this course, they will be ready to take more advanced programming courses. This course covers Python 2."
    }
  },
  { 
    id: 3,
    body_params: {
      title: 'Learning How to Learn: Powerful mental tools to help you master tough subjects',
      source: 'Coursera',
      link: 'https://www.coursera.org/learn/learning-how-to-learn',
      img: '/styles/img/courses/3.jpeg',
      list: [1, 2, 3, 4],
      description: "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects. \r\rUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide."
    }
  }
];

const community = [
  { 
    id: 1,
    body_params: {
      title: 'Philipp Schmidt',
      source: 'MIT Media Lab',
      link: 'https://www.media.mit.edu/people/ps1/overview/',
      img: '/styles/img/community/ps1.jpg',
      list: [1, 2, 3],
      description: "J. Philipp Schmidt is Director of Learning Innovation at the MIT Media Lab, where he leads the ML Learning initiative, teaches courses, and conducts research on learning communities. He is also a cofounder and board member of Peer 2 Peer University (P2PU), a non-profit organization that provides access to online higher education through public libraries. Philipp served on the founding board of the OpenCourseWare Consortium, co-authored the Cape Town Open Education Declaration, and is an advisor to a number of non-profit and for-profit education projects. He has received Shuttleworth and Ashoka fellowships, and came to MIT as a Media Lab Director's fellow."
    } 
  },
  { 
    id: 2,
    body_params: {
      title: 'Katherine McConachie',
      source: 'MIT Media Lab',
      link: 'https://www.media.mit.edu/people/kamcco/overview/',
      img: '/styles/img/community/Katherine_McConachie.jpg',
      list: [1, 2, 3],
      description: "Katherine McConachie is the ML Learning Initiative Coordinator, where she serves as the ‘swiss army knife’ for several projects at the intersection of designing and researching creative learning communities, technologies, and experiences. She is also the product manager of Unhangout, an open­-source platform for running large-­scale, participatory discussion events online. An engineer by training, Katherine also holds a M.Ed from the Harvard Graduate School of Education, specializing in technology and innovation."
    }
  },
  { 
    id: 3,
    body_params: {
      title: 'Yumiko Murai',
      source: 'MIT Media Lab',
      link: 'https://www.media.mit.edu/people/yumikom/overview/',
      img: '/styles/img/community/Yumiko_Murai.jpg',
      list: [1, 2, 3],
      description: "Yumiko is a postdoctoral associate who has recently joined the MIT Media Lab Learning Initiative to pursue her passion to design and investigate online social learning experiences. Yumiko holds a Doctor of Education degree in Communication from Teachers College, Columbia University for her work focusing on engagement and sense of belonging in online learning communities of adults leaners."
    }
  },
  { 
    id: 4,
    body_params: {
      title: 'Noor Eddin Amer',
      source: 'MIT Media Lab',
      link: 'https://nooralasa.github.io/',
      img: '/styles/img/community/noor.jpg',
      list: [1, 2, 3],
      description: "A boy has no name. A boy is no one."
    }
  }
];

const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};
const panelStyles = { margin: 10, maxHeight: 400, overflowY: 'scroll'};

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

  renderItemPanel(course) {
    return renderModulePanel(course, 'Enroll Now', 'Course Channel', 'Course Description', community, idToIndex, 'Enrolled Scholars');
  }

  render() {
    return (
      <div className="courses">
        <Navbar items={[['Announcements','/announcements'], ['Courses','/courses'], ['Community','/community']]} />
        
        <Body>
          <Title>Courses</Title>
          
          <ItemsPanel 
            items={courses} 
            idToIndex={idToIndex} 
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel} />
        </Body>

        <Footer />
      </div>
    );
  }
}

export default Courses;