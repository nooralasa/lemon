import { connect } from 'react-redux';
import RegistrationPage from '../pages/RegistrationPage';
import { browserHistory } from 'react-router';

import {
  incrementCurrentTutotial, 
  decrementCurrentTutotial,
  setCurrentTutorial,
  forkPortfolio,
  editTutorial} from '../../redux/actions/registrationActions';
import {
  currentScholar,
  fetchScholars} from '../../redux/actions/communityActions';


const mapStateToProps = (state) => {
  return {
    currentUser: state.community.get('currentlyLoggedIn'),
  	tutorialsList: state.registration.get('tutorialsList').toArray(),
    tutorialsById: state.registration.get('tutorialsById').toJSON(),
    currentTutorial: state.registration.get('currentTutorial'),
    isButtonActive: state.registration.get('isButtonActive'),
    username: state.registration.get('username')
  }
}

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
    },
    decrementStep: () => {
      dispatch(decrementCurrentTutotial());
    },
    onButtonClick: (user_id) => {
      return (id, a) => {
        console.log('Im in onButtonClick');
        console.log('id ', id);
        switch (id) {
          case 2:
          case 3:
          case 6:
          case 8:
            window.open(a);
            //window.location.replace('/build/register/'+(id+1));
            return

          case 1:
          case 4:
          case 7:
          case 9:
            window.location.replace(a);
            return

          case 5:
            dispatch(forkPortfolio(user_id, function(username) {
              console.log('username ', username);
              dispatch(editTutorial('6', ['Success! You now have a repository for your personal LIME portfolio called lime-portfolio. Your personal portfolio will be viewable in roughly 15 minutes at '+username+'.gitlab.io/lime-portfolio. You can customize it and make it your own by editing the repo.'], 'Customize my portfolio!', 'https://gitlab.com/'+username+'/lime-portfolio'));
              dispatch(incrementCurrentTutotial());
              browserHistory.push('/build/register/6');
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
 * we use this to pass the currently logged in user to the handleButtonClick function
 * @param stateProps all the props taken directly from the state
 * @param dispatchProps all the functions defined above to dispatch events
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
    onButtonClick: dispatchProps.onButtonClick(stateProps.currentUser)
  }
}

const RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RegistrationPage)

export default RegistrationContainer;