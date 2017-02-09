import { connect } from 'react-redux';
import LandingPage from '../pages/LandingPage';
import {logIn} from '../../redux/actions/authenticationActions';


const mapStateToProps = (state) => {
  return {
  	isLoggedIn: state.courses.get('isLoggedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogInAttempt: () => {
      dispatch(logIn());
    }
  }
}

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingContainer;