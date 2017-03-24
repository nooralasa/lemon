import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


var tutorial = {
  1: {
    id: 1,
    heading: 'Welcome to Learning Innovators Middle East!',
    body: ["LIME is a capacity-building program that will offer a series of online courses.",
    "This tutorial will take you through registration. Click the next arrow to get started!"],
    button: null,
    a: null
  },

  2: {
    id: 2,
    heading: null,
    body: ["First, create a Github account. In LIME, we'll be working on and sharing projects through Github. Check your inbox for a verification email, then return to this page after verifying your email address."],
    button: 'Create an account!',
    a: 'http://www.google.com'
  },

  3: {
    id: 3,
    heading: null,
    body: ['Next, update your profile. Upload a profile picture, add your name and a public email, specify your university under "company," and type a short blurb about yourself so we know who you are!'],
    button: 'Customize my profile!',
    a:'#'
  },

  4: {
    id: 4,
    heading: null,
    body: ["Now you're ready to login to LIME through Github!"],
    button: 'Link my accounts!',
    a: '#'
  },

  5: {
    id: 5,
    heading: null,
    body: ["We've created a portfolio page for you. You can customize this later; for now, you can fork it to add it to your Github."],
    button: 'Fork my repo!',
    a: '#'
  },

  6: {
    id: 6,
    heading: null,
    body: ['Success! You now have a repository for your personal LIME portfolio called lime-portfolio. You can customize it and make it your own by editing the repo.'],
    button: 'Customize my portfolio!',
    a: '#'
  },

  7: {
    id: 7,
    heading: null,
    body: ["Gitter is a chat platform. Let's sign up for Gitter and add you to the LIME community so you can ask for help if you ever get stuck or have a question for us."],
    button: 'Sign up for Gitter!',
    a: '#'
  },

  8: {
    id: 8,
    heading: null,
    body: ["Within our Gitter community, you can send messages to your peers, ask instructors questions, and even copy/paste your code if you need help debugging. You'll always be able to access it through the URL below."],
    button: 'Take me to Gitter!',
    a: '#'
  },

  9: {
    id: 9,
    heading: "You're all set!",
    body: ["You're now all set up and ready to start learning. Click the button to complete registration!"],
    button: 'End this tutorial!',
    a: '#'
  }
};


class Flexbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonActive: false,
      currentStep: 1
    };

    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleButtonActive = this.handleButtonActive.bind(this);

  }

  handleForwardClick() {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1
    }));

  }

  handleBackClick() {
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1
    }));
  }

  handleButtonActive() {
    this.setState(prevState => ({
      isButtonActive: !prevState.isButtonActive
    }));
  }

  render() {
    var button = [];
    if (this.props.tutorial[this.state.currentStep].button) {
      button.push(<ButtonLink 
        currentStep={this.state.currentStep}
        allSteps={this.props.tutorial}
      />);
    }
    return (
      /*not responsive*/
      <div>
      {/*<div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:'50px'}}>*/}
        <div className='col-md-5'>
          <RegistrationHeading
            currentStep={this.state.currentStep}
            allSteps={this.props.tutorial}
            />
          <RegistrationText
            currentStep={this.state.currentStep}
            allSteps={this.props.tutorial}
            />
          <div>{button}</div>
          <Progress currentStep={this.state.currentStep} allSteps={this.props.tutorial} onForwardClick={this.handleForwardClick} onBackClick={this.handleBackClick}/>
        </div>
        <div className='col-md-7'>
          <RegistrationImage />
        </div>
      </div>
    );
  }
}

class RegistrationHeading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  
      <div>
        <p style={{fontWeight:  '800', fontSize: '23px', marginBottom:'20px'}}>
          {this.props.allSteps[this.props.currentStep].heading}
        </p>
      </div>  
    );
  }
}

class RegistrationText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  
      <div>
        <p className="lead">
          {this.props.allSteps[this.props.currentStep].body}
        </p>
      </div>  
    );
  }
}

class ButtonLink extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <button style={{backgroundColor:'#bbdb8f', border:'none', padding:'5px 10px', borderRadius:'5px'}}>
          <a href={this.props.allSteps[this.props.currentStep].a} style={{color:'white', textDecoration:'none'}}>{this.props.allSteps[this.props.currentStep].button}</a>
        </button>
      </div>
    )
  }
}

class RegistrationImage extends Component {
  render() {
    return (  
      <div>
        <rbs.Image
          src="/styles/img/img.png"
          width="100%"
        />
      </div>  
    );
  }
}

class PastCircle extends Component {
  render() {
    return (
      <div style={{backgroundColor:'#dddddd',
          borderRadius:'50%',
          border:'1.5px solid #a8a8a8',
          width:'15px',
          height:'15px',
          margin:'0 3px'
          }}>
        &nbsp;
      </div>
    );
  }

}

class CurrentCircle extends Component {
  render() {
    return (
      <div style={{backgroundColor:'#bbdb8f',
          borderRadius:'50%',
          border:'1.5px solid #a8a8a8',
          width:'15px',
          height:'15px',
          margin:'0 3px'
          }}>
        &nbsp;
      </div>
    );
  }
}

class FutureCircle extends Component {
  render() {
    return (
      <div style={{backgroundColor:'white',
          borderRadius:'50%',
          border:'1.5px solid #a8a8a8',
          width:'15px',
          height:'15px',
          margin:'0 3px'
          }}>
        &nbsp;
      </div>
    );
  }
}

class Progress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var circles = [];
    var i = 1;
    while (i < this.props.currentStep) {
      circles.push(<PastCircle />);
      i++;
    };

    circles.push(<CurrentCircle />);
    i++;

    while ((9 - i) > 0) {
      circles.push(<FutureCircle />);
      i++;
    };

    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginTop:'20px', marginBottom:'30px'}}>

        <button
          style={{backgroundColor:'transparent', border:'none', fontSize:'30px', fontWeight:'300', color:'#bbdb8f'}}
          onClick={this.props.onBackClick}>
          &#60;
        </button>

        <div style={{display:'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center', marginLeft:'15px', marginRight:'15px'}}>  
          {circles}
        </div>

        <button
          style={{backgroundColor:'transparent', border:'none', fontSize:'30px', fontWeight:'300', color:'#bbdb8f'}}
          onClick={this.props.onForwardClick}>
          &#62;
        </button>
      </div>
    );
  }
}

class Registration extends Component {

  render() {
    return (
      <div>
        <Navbar items={[['About','#about'], ['Contact', '#contact']]}/>
        <div>
          <div className="container-fluid" style={{paddingTop: '100px'}}>
            <div className="row" style={{textAlign:'center', margin:'0 auto'}}>
              {/*add backgroundColor:'blue'*/}
              <Flexbox tutorial={tutorial}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Registration;
