// ------------------------------------------------------------------ //
// The Registration Page                                              //
// The React Component to be endered with the /build/register/:id uri //
// ------------------------------------------------------------------ //

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

// ---React Components--- //
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/** 
 * The Flexbox Componenet
 * This component renders the contents of the current tutorial
 **/
class Flexbox extends Component {
  /** 
   * The constructor binds the class functions to this, so this.props becomes accessable
   * It also defined the initial state of the component
   **/
  constructor(props) {
    super(props);

    this.state = {
      isButtonActive:false
    }

    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonActive = this.handleButtonActive.bind(this);
  }

  /** 
   * Switches the contents of the registration page to that of the next tutorial
   **/
  handleForwardClick() {
    this.props.incrementStep();
    browserHistory.push('/build/register/'+(this.props.currentStep+1));
  }

  /** 
   * Switches the contents of the registration page to that of the previous tutorial
   **/
  handleBackClick() {
    this.props.decrementStep();
    browserHistory.push('/build/register/'+(this.props.currentStep-1));
  }

  /** 
   * Handler for button clicks
   * @param id the id of the current tutorial
   * @param a the link that the current tutorial links to
   **/
  handleButtonClick(id, a) {
    this.props.onButtonClick(id, a);
  }

  /** 
   * Determines whether the next step arrow should be active or not
   **/
  handleButtonActive() {
    this.setState(prevState => ({
      isButtonActive: !prevState.isButtonActive
    }));
  }

  /**
   * a function declaration that is called  by React to render this component 
   * @return the tutorial content
   **/
  render() {
    var button = [];
    if (this.props.tutorial[this.props.currentStep].button) {
      button.push(<ButtonLink 
        currentStep={this.props.currentStep}
        allSteps={this.props.tutorial}
        username={this.props.username}
        handleButtonClick={this.handleButtonClick}
        onButtonActive={this.handleButtonActive} />);
    }

    return (
      <div>
        <div className='col-md-5'>
          <RegistrationHeading
            currentStep={this.props.currentStep}
            allSteps={this.props.tutorial} />

          <RegistrationText
            currentStep={this.props.currentStep}
            allSteps={this.props.tutorial} />

          <Progress currentStep={this.props.currentStep}
            allSteps={this.props.tutorial}
            button={button}
            buttonActive={this.state.isButtonActive}
            onForwardClick={this.handleForwardClick}
            onBackClick={this.handleBackClick}
            onButtonActive={this.handleButtonActive}/>
        </div>
        <div className='col-md-7'>
          <RegistrationImage
            currentStep={this.props.currentStep}
            allSteps={this.props.tutorial} />
        </div>
      </div>
    );
  }
}

/** 
 * The Registration Heading Componenet
 * This component renders the heading of the current tutorial
 **/
class RegistrationHeading extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the tutorial heading
   **/
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

/** 
 * The Registration Text Componenet
 * This component renders the body of the current tutorial
 **/
class RegistrationText extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the tutorial text
   **/
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

/** 
 * The Button Link Componenet
 * This component renders the main button for the tutorial and assigns it to the correct handler 
 **/
class ButtonLink extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the main button for the current tutroial
   **/
  render() {
    return (
      <div>
        <rbs.Button onClick={() => {this.props.handleButtonClick(this.props.currentStep, this.props.allSteps[this.props.currentStep].a, this.props.username)}}
          style={{backgroundColor:'#bbdb8f', border:'none', padding:'5px 10px', borderRadius:'5px'}}
          >
          <a style={{color:'white', textDecoration:'none'}}
            target="_blank"
            onClick={this.props.onButtonActive}>
            {this.props.allSteps[this.props.currentStep].button}
          </a>
        </rbs.Button>
      </div>
    )
  }
}

/** 
 * The Registration Image Componenet
 * This component renders the image associared with the current tutorial
 **/
class RegistrationImage extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the current tutorial's image
   **/
  render() {
    return (  
      <div>
        <rbs.Image
          src={this.props.allSteps[this.props.currentStep].img}
          width="100%"
        />
      </div>  
    );
  }
}

/** 
 * The Past Circle Componenet
 * An instance of a circle representing a tutorial that the user already visited 
 **/
class PastCircle extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return a past circle
   **/
  render() {
    return (
      <div style={{backgroundColor:'#dddddd',
          borderRadius:'50%',
          border:'1.5px solid #a8a8a8',
          width:'15px',
          height:'15px',
          margin:'0 3px'
          }}
          /*onClick={() => window.location.replace('/build/register/'+this.props.id)}*/>
        &nbsp;
      </div>
    );
  }

}

/** 
 * The Current Circle Componenet
 * An instance of a circle representing the tutorial that the user is currently visiting
 **/
class CurrentCircle extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the current circle
   **/
  render() {
    return (
      <div style={{backgroundColor:'#bbdb8f',
          borderRadius:'50%',
          border:'1.5px solid #a8a8a8',
          width:'15px',
          height:'15px',
          margin:'0 3px'
          }}
          /*onClick={() => window.location.replace('/build/register/'+this.props.id)}*/>
        &nbsp;
      </div>
    );
  }
}

/** 
 * The Future Circle Componenet
 * An instance of a circle representing a tutorial that the user is will visit in the future
 **/
class FutureCircle extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the future circle
   **/
  render() {
    return (
      <div style={{backgroundColor:'white',
          borderRadius:'50%',
          border:'1.5px solid #a8a8a8',
          width:'15px',
          height:'15px',
          margin:'0 3px'
          }}
          /*onClick={() => window.location.replace('/build/register/'+this.props.id)}*/>
        &nbsp;
      </div>
    );
  }
}

/** 
 * The Progress Componenet
 * A progress bar made out of circles with a back and forward arrows
 **/
class Progress extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the progress bar with correct button handlers
   **/
  render() {
    var circles = [];
    var i = 1;
    while (i < this.props.currentStep) {
      circles.push(<PastCircle id={i}/>);
      i++;
    };

    circles.push(<CurrentCircle id={this.props.currentStep}/>);
    i++;

    while ((10 - i) > 0) {
      circles.push(<FutureCircle id={i}/>);
      i++;
    };

    var buttonActive = [];

    if (this.props.buttonActive) {
        buttonActive.push(<button
          style={{backgroundColor:'transparent', border:'none', fontSize:'30px', fontWeight:'300', color:'#bbdb8f'}}
          onClick={() => {this.props.onForwardClick(); this.props.onButtonActive();}}>
          &#62;
        </button>)
    } else {
      buttonActive.push(<button
          style={{backgroundColor:'transparent', border:'none', fontSize:'30px', fontWeight:'300', color:'#dddddd'}}>
          &#62;
        </button>)
    };

    return (
      <div>
        <div>{this.props.button}</div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginTop:'20px', marginBottom:'30px'}}>
          <button
            style={{backgroundColor:'transparent', border:'none', fontSize:'30px', fontWeight:'300', color:'#bbdb8f'}}
            onClick={this.props.onBackClick}>
            &#60;
          </button>
          <div style={{display:'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center', marginLeft:'15px', marginRight:'15px'}}>  
            {circles}
          </div>
          {buttonActive}
        </div>
      </div>
    );
  }
}

/** 
 * The Registration Page Componenet
 * This component renders the entire page when the /build/register/:id uri is fetched
 **/
class Registration extends Component {

  /**
   * a function declaration that is called  by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the registration page
   **/
  componentDidMount() {
    this.props.mount();
  }

  /**
   * a function declaration that is called  by React to render this component 
   * @return the registration page
   **/
  render() {
    return (
      <div>
        <Navbar items={[]}/>
        <div>
          <div className="container-fluid" style={{paddingTop: '100px'}}>
            <div className="row" style={{textAlign:'center', margin:'0 auto'}}>
              {/*add backgroundColor:'blue'*/}
              <Flexbox 
                tutorial={this.props.tutorialsById} 
                currentStep={this.props.currentTutorial}
                username={this.props.username}
                isButtonActive={this.props.isButtonActive}
                incrementStep={this.props.incrementStep}
                decrementStep={this.props.decrementStep}
                onButtonClick={this.props.onButtonClick}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in from 
 * the RegistrationContainer which passes this data from the Redux store 
 **/
Registration.propTypes = {
  currentUser: PropTypes.string.isRequired,
  tutorialsList: PropTypes.array.isRequired,
  tutorialsById: PropTypes.object.isRequired,
  currentTutorial: PropTypes.number.isRequired,
  isButtonActive: PropTypes.bool.isRequired,
  incrementStep: PropTypes.func.isRequired,
  decrementStep: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Registration;
