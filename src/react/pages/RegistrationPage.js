import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


class Flexbox extends Component {
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

  handleForwardClick() {
    this.props.incrementStep();
    browserHistory.push('/build/register/'+(this.props.currentStep+1));
  }

  handleBackClick() {
    this.props.decrementStep();
    browserHistory.push('/build/register/'+(this.props.currentStep-1));
  }

  handleButtonClick(id, a) {
    console.log('Im about to run the fn');
    this.props.onButtonClick(id, a);
  }

  handleButtonActive() {
    this.setState(prevState => ({
      isButtonActive: !prevState.isButtonActive
    }));
  }

  render() {
    var button = [];
    console.log('this.props.currentStep ', this.props.currentStep);
    console.log('this.props.tutorial ', this.props.tutorial);
    if (this.props.tutorial[this.props.currentStep].button) {
      button.push(<ButtonLink 
        currentStep={this.props.currentStep}
        allSteps={this.props.tutorial}
        handleButtonClick={this.handleButtonClick}
        onButtonActive={this.handleButtonActive}
      />);
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
        <rbs.Button onClick={() => {this.props.handleButtonClick(this.props.currentStep, this.props.allSteps[this.props.currentStep].a)}}
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

class RegistrationImage extends Component {
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

class PastCircle extends Component {
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

class CurrentCircle extends Component {
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

class FutureCircle extends Component {
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

class Progress extends Component {
  constructor(props) {
    super(props);
  }

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

class Registration extends Component {

  /**
   * a function declaration that is called  by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the announcements page
   **/
  componentDidMount() {
    this.props.mount();
  }

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

export default Registration;
