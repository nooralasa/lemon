// ----------------------------------------------------------------------- //
// The Registration Container                                              //
// This Container Component links the Redux store to the Registration Page //
// ----------------------------------------------------------------------- //

/** 
 * React-Redux and React-Router Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 * @import browserHistory the urls that will be rendered in the browser
 **/
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

//Registration Page Presentational Component
import RegistrationPage from '../pages/RegistrationPage';

//Redux actions for fetching data from the redux store and changing ui state
import {
  incrementCurrentTutotial, 
  decrementCurrentTutotial,
  setCurrentTutorial,
  setActiveState,
  setInactiveState,
  setWaitingState,
  forkPortfolio,
  editTutorial} from '../../redux/actions/registrationActions';
import {
  currentScholar,
  fetchScholars} from '../../redux/actions/communityActions';

/**
 * a function declaration to be called by React-Redux 
 * here we specify what parts of the application state to share with the Registration Page
 * @param state the application state as passed in by Redux
 * @return object.tutorialsList the list of tutorial ids
 * @return object.tutorialsById an object mapping tutorial ids to tutorial data
 * @return object.currentTutorial the id of the tutorial to be rendered
 * @return object.isButtonActive boolean indicating whether the user can moves on to the next tutorial
 * @return object.currentUser the id of the user as saved in the browser sessions
 * @return object.username the gitlan username of the user going through registration
 **/
const mapStateToProps = (state) => {
  return {
    currentUser: state.community.get('currentlyLoggedIn'),
    tutorialsList: state.registration.get('tutorialsList').toArray(),
    tutorialsById: state.registration.get('tutorialsById').toJSON(),
    currentTutorial: state.registration.get('currentTutorial'),
    isButtonActive: state.registration.get('isButtonActive'),
    username: state.registration.get('username'),
    currentState: state.registration.get('currentState')
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * here we define functions to be passed to the Registration Page as props
 * these functions dispatch Redux actions to update the application state
 * @param dispatch a function that can dispatch actions to the Redux store
 * @return object.mount fetches data from the redux store before rendering
 * @return object.incrementStep increments the current visible tutorial
 * @return object.decrementStep decrements the current visible tutorial
 * @return object.onButtonClick handles the button click in each tutorial
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: (id) => {
      return () => {
        dispatch(setCurrentTutorial(parseInt(id, 10)));
        dispatch(currentScholar((res) => {return res}));
        dispatch(fetchScholars());
      }
    },
    incrementStep: () => {
      dispatch(incrementCurrentTutotial());
      dispatch(setInactiveState());
    },
    decrementStep: () => {
      dispatch(decrementCurrentTutotial());
    },
    onButtonClick: (user_id) => {
      console.log('in onButtonClick');
      return (id, a) => {
        console.log('Im in onButtonClick');
        console.log('id ', id);
        switch (id) {
          case 2:
          case 3:
          case 4:
          case 6:
          case 8:
            console.log('about to run this');
            window.open(a);
            dispatch(setActiveState());
            //window.location.replace('/build/register/'+(id+1));
            return

          case 1:
          case 7:
          case 9:
            window.location.replace(a);
            dispatch(setActiveState());
            return

          case 5:
            dispatch(setWaitingState());
            dispatch(forkPortfolio(user_id, function(username) {
              console.log('username ', username);
              dispatch(editTutorial('6', ['Success! You now have a repository for your personal LIME portfolio called lime-portfolio. Your personal portfolio will be viewable in roughly 15 minutes at '+username+'.gitlab.io/lime-portfolio. You can customize it and make it your own by editing the repo.'], 'Customize my portfolio!', 'https://gitlab.com/'+username+'/lime-portfolio'));
              dispatch(incrementCurrentTutotial());
              browserHistory.push('/build/register/6');
              dispatch(setActiveState());
            }));
            return

          default:
            return
        }
      }
    }
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * this function can be used to use the state data fetched by mapStateToProps
 * with the defined functions in mapDispatchToProps
 * @param stateProps all the props taken directly from the state
 * @param dispatchProps all the functions defined above to dispatch events
 * @param ownProps all the props passed into the container from parent elements (router)
 * @return the mixture of these two props to be passed into the presentation component
 **/
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    currentUser: stateProps.currentUser,
    username: stateProps.username,
    tutorialsList: stateProps.tutorialsList,
    tutorialsById: stateProps.tutorialsById,
    currentTutorial: stateProps.currentTutorial,
    isButtonActive: stateProps.isButtonActive,
    incrementStep: dispatchProps.incrementStep,
    decrementStep: dispatchProps.decrementStep,
    mount: dispatchProps.mount(ownProps.routeParams.id, stateProps.username),
    onButtonClick: dispatchProps.onButtonClick(stateProps.currentUser),
    currentState: stateProps.currentState
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to RegistrationPage as props
 **/
const RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RegistrationPage)

export default RegistrationContainer;