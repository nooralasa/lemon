// ---------------------------------------------- //
// This is the reducer for announcement ui state. //
// ---------------------------------------------- //

//importing relevant action types
import {
	INCREMENT_CURRENT_TUTORIAL, 
	DECREMENT_CURRENT_TUTORIAL,
	SET_CURRENT_TUTORIAL,
	FORK_PORTFOLIO_SUCCESS} from '../actions/registrationActions.js';

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialRegistrationState = Immutable.fromJS({
	tutorialsList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	tutorialsById: {
	  1: {
	    id: 1,
	    heading: 'Welcome to Learning Innovators Middle East!',
	    body: ["LIME is a capacity-building program that will offer a series of online courses to innovators from the Middle East.",
	    "This tutorial will take you through registration. Click the next arrow to get started!"],
	    button: 'Start this tutorial',
	    a: '/build/register/2',
	    img: ''
	  },

	  2: {
	    id: 2,
	    heading: null,
	    body: ["First, create a Gitlab account. In LIME, we'll be working on and sharing projects through Gitlab. Check your inbox for a verification email, then return to this page after verifying your email address."],
	    button: 'Create an account!',
	    a: 'https://gitlab.com/users/sign_in',
	    img: ''
	  },

	  3: {
	    id: 3,
	    heading: null,
	    body: ['Next, update your profile. Upload a profile picture, add your name and a public email, specify your university or company under "organization," and type a short bio so we know who you are!'],
	    button: 'Customize my profile!',
	    a:'https://gitlab.com/profile',
	    img: ''
	  },

	  4: {
	    id: 4,
	    heading: null,
	    body: ["Now you're ready to login to LIME with Gitlab!"],
	    button: 'Link my account!',
	    a: '/auth/gitlab-register',

	    img: ''
	  },

	  5: {
	    id: 5,
	    heading: null,
	    body: ["Hooray! You're logged in. ", "We want to know more about you and your projects. We will help you get started by creating a personal portfolio.","Create your own personal portfolio on gitlab. The page may take a few minutes to reload, don't worry things are happening in the backend."],
	    button: 'Create my portfolio!',
	    a: '',
	    img: ''
	  },

	  6: {
	    id: 6,
	    heading: null,
	    body: ['Success! You now have a repository for your personal LIME portfolio called lime-portfolio. Your personal portfolio will be viewable in roughly 15 minutes at yourusername.gitlab.io/lime-portfolio. You can customize it and make it your own by editing the repo.'],
	    button: 'Customize my portfolio!',
	    a: 'https://gitlab.com/',
	    img: ''
	  },

	  7: {
	    id: 7,
	    heading: null,
	    body: ["Gitter is a chat platform. Let's sign up for Gitter and add you to the LIME community so you can ask for help if you ever get stuck or have a question for us."],
	    button: 'Sign up for Gitter!',
	    a: '/auth/gitter',
	    img: ''
	  },

	  8: {
	    id: 8,
	    heading: null,
	    body: ["Within our Gitter community, you can send messages to your peers, ask instructors questions, and even copy/paste your code if you need help debugging.", "You'll always be able to access it through the URL below. Go to Gitter and say Hello World!"],
	    button: 'Take me to Gitter!',
	    a: 'https://gitter.im/ML-LIME',
	    img: ''
	  },

	  9: {
	    id: 9,
	    heading: "You're all set!",
	    body: ["You're now all set up and ready to start learning. Click the button to complete registration!"],
	    button: 'End this tutorial!',
	    a: '/build/announcements/1',
	    img: ''
	  }
	},
	currentTutorial: 1,
	isButtonActive: false,
	username: ''
});

/**
 * Reducer for announcements ui state
 * This reducer handles rendering the announcements list or a specific announcement 
 * @param state the current state of the app
 *							set to initialAnnouncementsUIState when the app is first run
 * @param action the dispatched action
 **/
function registration(state = initialRegistrationState, action) {
	switch (action.type) {

		case INCREMENT_CURRENT_TUTORIAL:
			state = state.update('currentTutorial', currentTutorial => currentTutorial+1);
			return state

		case DECREMENT_CURRENT_TUTORIAL:
			state = state.update('currentTutorial', currentTutorial => currentTutorial-1);
			return state

		case SET_CURRENT_TUTORIAL:
			state = state.update('currentTutorial', currentTutorial => action.payload.id);
			return state

		case FORK_PORTFOLIO_SUCCESS:
			state = state.update('username', username => action.payload.username);
			return state

		default: 
			return state;
	}
}

export default registration;
