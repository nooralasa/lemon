import { connect } from 'react-redux';
import LandingPage from '../pages/LandingPage';
import {logIn, fetchLogIn} from '../../redux/actions/authenticationActions';


const mapStateToProps = (state) => {
  return {
  	isLoggedIn: state.authentication.get('isLoggedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogInAttempt: () => {
      dispatch(fetchLogIn());
    }
  }
}

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingContainer;