import { connect } from 'react-redux';
import RegistrationPage from '../pages/RegistrationPage';
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

const RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage)

export default RegistrationContainer;