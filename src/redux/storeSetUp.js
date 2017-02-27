import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from './reducers/index';
import {addAnnouncement, updateAnnouncement, deleteAnnouncement} from './actions/announcementsActions.js';
import {logIn , logOut, signUp} from './actions/authenticationActions.js';
// import {fetchAnnouncements, fetchAnnouncement} from './actions/announcementsUIActions.js'
import {addScholar, updateScholar, deleteScholar, addScholarCourse} from './actions/communityActions.js'
// import {fetchScholars, fetchScholar} from './actions/communityUIActions.js'
import {addCourse, updateCourse, deleteCourse} from './actions/coursesActions.js'
// import {fetchCourses, fetchCourse} from './actions/coursesUIActions.js'

import * as Immutable from 'immutable';

const loggerMiddleware = createLogger();

function getInitialState() {
	const initialState = Immutable.fromJS({
		authentication: {},
		announcements: {},
		announcementsUI: {},
		courses: {},
		coursesUI: {},
		community: {},
		communityUI: {}
	});

	return initialState;
}

function storeSetUp() {

	const store = createStore(
		appReducer,
		compose(
      applyMiddleware(
				thunkMiddleware,
				loggerMiddleware
			),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

	//console.info(JSON.stringify(store.getState(), null, ' '));

	// let unsubscribe = store.subscribe(() =>
	//   console.info(JSON.stringify(store.getState(), null, ' '))
	// )

	// store.dispatch(logIn());
	// store.dispatch(logOut());
	// store.dispatch(signUp());

	// store.dispatch(addCourse('Swift: Building iOS Apps', 'Swift', 'Flatiron School', 'https://flatironschool.com/programs/online-swift-free-course/', 'https://flatironschool.imgix.net/online-swift/build-ios-applications-v2.jpg?fit=crop&crop=entropy', "We’ll start with the fundamentals of Swift and move on to more advanced topics like Higher Order Functions, Protocols, and Extensions. Write, run, and view your code in Xcode and learn how to read warning and error messages. Use Interface Builder and Auto Layout to build interactive, visually stunning applications."));
	// store.dispatch(addCourse('Intro to JavaScript', 'JavaScript', 'Flatiron School', 'https://flatironschool.com/programs/online-intro-javascript-free-course/', 'https://flatironschool.imgix.net/online-intro-to-javascript-free/course-graphics-expand-your-skills.jpg?fit=crop&crop=entropy', "You’ll build a Konami code program and a working game in JavaScript (and we promise it’s not yet-another-Blackjack clone!). You’ll also master the latest JavaScript syntax and techniques, an essential base for launching into further learning."));
	// store.dispatch(addCourse('How to Create Anything in Android', 'Android','Udacity', 'https://www.udacity.com/course/how-to-create-anything-in-android--ud802', 'https://www.udacity.com/assets/pages/cop/nd801-366a1965b856969997591244b5bad242a2bc5f91f72f0c4275a53ed1d600406a.jpg',"Here is one important question Android developers ask while making apps: 'How can I do ________ in Android?' The following are versions of this question that we came across recently: How can I add radio buttons to my app? How can I play a sound? How can I navigate between multiple screens? This course is a collection of such questions and their answers. By the end of this course you will have mastered the ability to implement new Android features by reading a blog or article — this is a critical skill possessed by professional Android developers. As a result, you will also be able to use several User Interface components — like Toggle Buttons, Menus, Grid View and many more — that are central to making functional and delightful Android apps."));
	// store.dispatch(addCourse('UX Design for Mobile Developers', 'UX-Design','Udacity', 'https://www.udacity.com/course/ux-design-for-mobile-developers--ud849', 'https://www.udacity.com/assets/pages/cop/nd801-366a1965b856969997591244b5bad242a2bc5f91f72f0c4275a53ed1d600406a.jpg',"This course is optimized for the developer who is looking to efficiently learn the most important design techniques that will help them make better apps (with a focus on mobile/Android). This is a UX design course built for current (and aspiring) mobile developers. In this short course, you'll step back from your IDE and dive into the techniques that great designers use to plan and prototype amazing apps before any code is written."));

	// store.dispatch(addCourse('Machine Learning', 'Coursea', 'https://www.coursera.org/learn/machine-learning', '/styles/img/courses/1.jpeg', "Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself. More importantly, you'll learn about not only the theoretical underpinnings of learning, but also gain the practical know-how needed to quickly and powerfully apply these techniques to new problems. Finally, you'll learn about some of Silicon Valley's best practices in innovation as it pertains to machine learning and AI.\n\nThis course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). (iii) Best practices in machine learning (bias/variance theory; innovation process in machine learning and AI). The course will also draw from numerous case studies and applications, so that you'll also learn how to apply learning algorithms to building smart robots (perception, control), text understanding (web search, anti-spam), computer vision, medical informatics, audio, database mining, and other areas."));
	// store.dispatch(addCourse('Programming for Everybody (Getting Started with Python)', 'Coursea', 'https://www.coursera.org/learn/python', '/styles/img/courses/2.jpeg', "This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python.  The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course. This course will cover Chapters 1-5 of the textbook “Python for Informatics”.   This course is equivalent to the first half of the 11-week 'Programming for Everybody (Python)' course.  Once a student completes this course, they will be ready to take more advanced programming courses. This course covers Python 2."));
	// store.dispatch(addCourse('Learning How to Learn: Powerful mental tools to help you master tough subjects', 'Coursea', 'https://www.coursera.org/learn/learning-how-to-learn', '/styles/img/courses/3.jpeg', "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects. \r\rUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide."));
	// // store.dispatch(addCourse('Learning How to Learn: Powerful mental tools to help you master tough subjects', 'Coursea', 'https://www.coursera.org/learn/learning-how-to-learn', '/styles/img/courses/3.jpeg', "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects. \r\rUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide."));

	// store.dispatch(addScholar('Philipp Schmidt', 'MIT Media Lab', 'https://www.media.mit.edu/people/ps1/overview/', '/styles/img/community/ps1.jpg', "J. Philipp Schmidt is Director of Learning Innovation at the MIT Media Lab, where he leads the ML Learning initiative, teaches courses, and conducts research on learning communities. He is also a cofounder and board member of Peer 2 Peer University (P2PU), a non-profit organization that provides access to online higher education through public libraries. Philipp served on the founding board of the OpenCourseWare Consortium, co-authored the Cape Town Open Education Declaration, and is an advisor to a number of non-profit and for-profit education projects. He has received Shuttleworth and Ashoka fellowships, and came to MIT as a Media Lab Director's fellow."));
	// store.dispatch(addScholar('Katherine McConachie', 'MIT Media Lab', 'https://www.media.mit.edu/people/kamcco/overview/', '/styles/img/community/Katherine_McConachie.jpg', "Katherine McConachie is the ML Learning Initiative Coordinator, where she serves as the ‘swiss army knife’ for several projects at the intersection of designing and researching creative learning communities, technologies, and experiences. She is also the product manager of Unhangout, an open­-source platform for running large-­scale, participatory discussion events online. An engineer by training, Katherine also holds a M.Ed from the Harvard Graduate School of Education, specializing in technology and innovation."));
	// store.dispatch(addScholar('Yumiko Murai', 'MIT Media Lab', 'https://www.media.mit.edu/people/yumikom/overview/', '/styles/img/community/Yumiko_Murai.jpg', "Yumiko is a postdoctoral associate who has recently joined the MIT Media Lab Learning Initiative to pursue her passion to design and investigate online social learning experiences. Yumiko holds a Doctor of Education degree in Communication from Teachers College, Columbia University for her work focusing on engagement and sense of belonging in online learning communities of adults leaners."));
	// store.dispatch(addScholar('Noor Eddin Amer', 'MIT Media Lab', 'https://nooralasa.github.io/', '/styles/img/community/noor.jpg', "A boy has no name. A boy is no one."));
	// // store.dispatch(addScholar('Noor Eddin Amer', 'MIT Media Lab', 'https://nooralasa.github.io/', '/styles/img/community/noor.jpg', "A boy has no name. A boy is no one."));
	
	// store.dispatch(addAnnouncement('Announcement 1', 'This is the first announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 2', 'This is the second announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 3', 'This is the third announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 4', 'This is the 4th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 5', 'This is the 5th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 6', 'This is the 6th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 7', 'This is the 7th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 8', 'This is the 8th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 9', 'This is the 9th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 10', 'This is the 10th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 11', 'This is the 11th announcement', 1));
	// store.dispatch(addAnnouncement('Announcement 12', 'This is the 12th announcement', 1));

	// store.dispatch(updateAnnouncement(2, 'Updated Announcement 2', 'This is the updated second announcement', 2));

	// store.dispatch(deleteAnnouncement(12));

	// store.dispatch(updateCourse(1, 'Machine Learning', 'Coursea', 'https://www.coursera.org/learn/machine-learning', '/styles/img/courses/1.jpeg', [0, 1, 2, 3], "Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself. More importantly, you'll learn about not only the theoretical underpinnings of learning, but also gain the practical know-how needed to quickly and powerfully apply these techniques to new problems. Finally, you'll learn about some of Silicon Valley's best practices in innovation as it pertains to machine learning and AI.\n\nThis course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). (iii) Best practices in machine learning (bias/variance theory; innovation process in machine learning and AI). The course will also draw from numerous case studies and applications, so that you'll also learn how to apply learning algorithms to building smart robots (perception, control), text understanding (web search, anti-spam), computer vision, medical informatics, audio, database mining, and other areas."));
	// store.dispatch(updateCourse(2, 'Programming for Everybody (Getting Started with Python)', 'Coursea', 'https://www.coursera.org/learn/python', '/styles/img/courses/2.jpeg', [0, 1, 2, 3], "This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python.  The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course. This course will cover Chapters 1-5 of the textbook “Python for Informatics”.   This course is equivalent to the first half of the 11-week 'Programming for Everybody (Python)' course.  Once a student completes this course, they will be ready to take more advanced programming courses. This course covers Python 2."));
	// store.dispatch(updateCourse(3, 'Learning How to Learn: Powerful mental tools to help you master tough subjects', 'Coursea', 'https://www.coursera.org/learn/learning-how-to-learn', '/styles/img/courses/3.jpeg', [0, 1, 2, 3], "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects. \r\rUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide."));

	// store.dispatch(updateScholar(1, 'Philippp Schmidt', 'MIT Media Lab', 'https://www.media.mit.edu/people/ps1/overview/', '/styles/img/community/ps1.jpg', [0, 1, 2], "J. Philipp Schmidt is Director of Learning Innovation at the MIT Media Lab, where he leads the ML Learning initiative, teaches courses, and conducts research on learning communities. He is also a cofounder and board member of Peer 2 Peer University (P2PU), a non-profit organization that provides access to online higher education through public libraries. Philipp served on the founding board of the OpenCourseWare Consortium, co-authored the Cape Town Open Education Declaration, and is an advisor to a number of non-profit and for-profit education projects. He has received Shuttleworth and Ashoka fellowships, and came to MIT as a Media Lab Director's fellow."));
	// store.dispatch(updateScholar(2, 'Katherine McConachie', 'MIT Media Lab', 'https://www.media.mit.edu/people/kamcco/overview/', '/styles/img/community/Katherine_McConachie.jpg', [0, 1, 2], "Katherine McConachie is the ML Learning Initiative Coordinator, where she serves as the ‘swiss army knife’ for several projects at the intersection of designing and researching creative learning communities, technologies, and experiences. She is also the product manager of Unhangout, an open­-source platform for running large-­scale, participatory discussion events online. An engineer by training, Katherine also holds a M.Ed from the Harvard Graduate School of Education, specializing in technology and innovation."));
	// store.dispatch(updateScholar(3, 'Yumiko Murai', 'MIT Media Lab', 'https://www.media.mit.edu/people/yumikom/overview/', '/styles/img/community/Yumiko_Murai.jpg', [0, 1, 2], "Yumiko is a postdoctoral associate who has recently joined the MIT Media Lab Learning Initiative to pursue her passion to design and investigate online social learning experiences. Yumiko holds a Doctor of Education degree in Communication from Teachers College, Columbia University for her work focusing on engagement and sense of belonging in online learning communities of adults leaners."));
	// store.dispatch(updateScholar(4, 'Noor Eddin Amer', 'MIT Media Lab', 'https://nooralasa.github.io/', '/styles/img/community/noor.jpg', [0, 1, 2], "A boy has no name. A boy is no one."));
	
	// store.dispatch(deleteCourse(4));
	// store.dispatch(deleteScholar(5));

	// store.dispatch(addScholarCourse(1, 1));
	// console.info(JSON.stringify(store.getState(), null, ' '));


	//unsubscribe();

	//console.info(JSON.stringify(store.getState(), null, ' '));

	return store;
}


export default storeSetUp;


