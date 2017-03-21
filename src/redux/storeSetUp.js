// ---------------------------------------------------------------- //
// This module exports a function thay initializes the redux store. //
// ---------------------------------------------------------------- //

//Importing actions that update the database and persist 
import {
	fetchAnnouncements,
	addAnnouncement, 
	updateAnnouncement, 
	deleteAnnouncement} from './actions/announcementsActions.js';
import {
	currentScholar,
	addScholarCourse,
	fetchScholars,
	fetchScholarCourses,
	addScholar,
	updateScholar,
	deleteScholar} from './actions/communityActions.js';
import {
	enrollInCourse,
	fetchCourses,
	fetchCourseUsers,
	addCourse,
	updateCourse,
	deleteCourse} from './actions/coursesActions.js';

//Importing actions that do not update the database and will only update the store locally
import {
	fetchAnnouncementsSuccess,
	addAnnouncementSuccess, 
	updateAnnouncementSuccess, 
	deleteAnnouncementSuccess} from './actions/announcementsActions.js';
import {
	currentScholarSuccess,
	addScholarCourseSuccess,
	fetchScholarsSuccess,
	fetchScholarCoursesSuccess,
	addScholarSuccess,
	updateScholarSuccess,
	deleteScholarSuccess} from './actions/communityActions.js';
import {
	enrollInCourseSuccess,
	fetchCoursesSuccess,
	fetchCourseUsersSuccess,
	addCourseSuccess,
	updateCourseSuccess,
	deleteCourseSuccess} from './actions/coursesActions.js';



function storeSetUp(store) {

	store.dispatch(addAnnouncement(
		'Welcome to LIME', 
		'On Behalf of the Media Lab Learning Initiative we would like to welcome you to LIME: Learning Innovators - Middle East. Welcome to our set of scholars and innovators. </br></br> LIME is platform where you can take online courses relating to learning, innovation and technology. Check out the courses tab to see the set of courses that we offer. </br></br> LIME is a community where you can collaborate with other scholars on courses. We encourage you to checkout the community tab to see who is part of LIME the community. We encourage you to collaborate with others in the community on projects.', 
		'5400684'	
	));

	// store.dispatch(addAnnouncement(
	// 	'Welcome to LIME', 
	// 	'On Behalf of the Media Lab Learning Initiative we would like to welcome you to LIME: Learning Innovators - Middle East. Welcome to our set of scholars and innovators. </br></br> LIME is platform where you can take online courses relating to learning, innovation and technology. Check out the courses tab to see the set of courses that we offer. </br></br> LIME is a community where you can collaborate with other scholars on courses. We encourage you to checkout the community tab to see who is part of LIME the community. We encourage you to collaborate with others in the community on projects.', 
	// 	'5400684'	
	// ));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 1,
	// 	header: 'Welcome to LIME', 
	// 	message: 'On Behalf of the Media Lab Learning Initiative we would like to welcome you to LIME: Learning Innovators - Middle East. Welcome to our set of scholars and innovators. </br></br> LIME is platform where you can take online courses relating to learning, innovation and technology. Check out the courses tab to see the set of courses that we offer. </br></br> LIME is a community where you can collaborate with other scholars on courses. We encourage you to checkout the community tab to see who is part of LIME the community. We encourage you to collaborate with others in the community on projects.', 
	// 	user_id: 1,
	// 	timestamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 2,
	// 	header: 'Announcement 2',
	// 	message: 'This is the second announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 3,
	// 	header: 'Announcement 3',
	// 	message: 'This is the third announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 4,
	// 	header: 'Announcement 4',
	// 	message: 'This is the 4th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 5,
	// 	header: 'Announcement 5',
	// 	message: 'This is the 5th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 6,
	// 	header: 'Announcement 6',
	// 	message: 'This is the 6th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 7,
	// 	header: 'Announcement 7',
	// 	message: 'This is the 7th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 8,
	// 	header: 'Announcement 8',
	// 	message: 'This is the 8th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 9,
	// 	header: 'Announcement 9',
	// 	message: 'This is the 9th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 10,
	// 	header: 'Announcement 10',
	// 	message: 'This is the 10th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 11,
	// 	header: 'Announcement 11',
	// 	message: 'This is the 11th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));

	// store.dispatch(addAnnouncementSuccess({
	// 	id: 12,
	// 	header: 'Announcement 12',
	// 	message: 'This is the 12th announcement', 
	// 	user_id: 1,
	// 	time_stamp: 'Fri, 10 Mar 2017 20:07:11'
	// }));


	// store.dispatch(addScholarSuccess({
	// 	id: 1,
	// 	name: 'Philipp Schmidt', 
	// 	affiliation: 'MIT Media Lab', 
	// 	portfolio: 'https://www.media.mit.edu/people/ps1/overview/', 
	// 	image: '/styles/img/community/ps1.jpg', 
	// 	description: "J. Philipp Schmidt is Director of Learning Innovation at the MIT Media Lab, where he leads the ML Learning initiative, teaches courses, and conducts research on learning communities. He is also a cofounder and board member of Peer 2 Peer University (P2PU), a non-profit organization that provides access to online higher education through public libraries. Philipp served on the founding board of the OpenCourseWare Consortium, co-authored the Cape Town Open Education Declaration, and is an advisor to a number of non-profit and for-profit education projects. He has received Shuttleworth and Ashoka fellowships, and came to MIT as a Media Lab Director's fellow."
	// }));

	// store.dispatch(addScholarSuccess({
	// 	id: 2,
	// 	name: 'Katherine McConachie',
	// 	affiliation: 'MIT Media Lab',
	// 	portfolio: 'https://www.media.mit.edu/people/kamcco/overview/',
	// 	image: '/styles/img/community/Katherine_McConachie.jpg',
	// 	description: "Katherine McConachie is the ML Learning Initiative Coordinator, where she serves as the ‘swiss army knife’ for several projects at the intersection of designing and researching creative learning communities, technologies, and experiences. She is also the product manager of Unhangout, an open­-source platform for running large-­scale, participatory discussion events online. An engineer by training, Katherine also holds a M.Ed from the Harvard Graduate School of Education, specializing in technology and innovation."
	// }));
	
	// store.dispatch(addScholarSuccess({
	// 	id: 3,
	// 	name: 'Yumiko Murai',
	// 	affiliation: 'MIT Media Lab',
	// 	portfolio: 'https://www.media.mit.edu/people/yumikom/overview/',
	// 	image: '/styles/img/community/Yumiko_Murai.jpg',
	// 	description: "Yumiko is a postdoctoral associate who has recently joined the MIT Media Lab Learning Initiative to pursue her passion to design and investigate online social learning experiences. Yumiko holds a Doctor of Education degree in Communication from Teachers College, Columbia University for her work focusing on engagement and sense of belonging in online learning communities of adults leaners."
	// }));
	
	// store.dispatch(addScholarSuccess({
	// 	id: 4,
	// 	name: 'Noor Eddin Amer',
	// 	affiliation: 'MIT Media Lab',
	// 	portfolio: 'https://nooralasa.github.io/',
	// 	image: '/styles/img/community/noor.jpg',
	// 	description: "A boy has no name. A boy is no one."
	// }));


	// store.dispatch(addCourseSuccess({
	// 	id: 1,
	// 	title: 'Swift: Building iOS Apps',
	// 	room: 'Swift', 
	// 	source: 'Flatiron School', 
	// 	course_link: 'https://flatironschool.com/programs/online-swift-free-course/',
	// 	image: 'https://flatironschool.imgix.net/online-swift/build-ios-applications-v2.jpg?fit=crop&crop=entropy', 
	// 	description: "We’ll start with the fundamentals of Swift and move on to more advanced topics like Higher Order Functions, Protocols, and Extensions. Write, run, and view your code in Xcode and learn how to read warning and error messages. Use Interface Builder and Auto Layout to build interactive, visually stunning applications."
	// }));

	// store.dispatch(addCourseSuccess({
	// 	id: 2,
	// 	title: 'Intro to JavaScript',
	// 	room: 'JavaScript', 
	// 	source: 'Flatiron School', 
	// 	course_link: 'https://flatironschool.com/programs/online-intro-javascript-free-course/', 
	// 	image: 'https://flatironschool.imgix.net/online-intro-to-javascript-free/course-graphics-expand-your-skills.jpg?fit=crop&crop=entropy', 
	// 	description: "You’ll build a Konami code program and a working game in JavaScript (and we promise it’s not yet-another-Blackjack clone!). You’ll also master the latest JavaScript syntax and techniques, an essential base for launching into further learning."
	// }));

	// store.dispatch(addCourseSuccess({
	// 	id: 3,
	// 	title: 'How to Create Anything in Android',
	// 	room: 'Android',
	// 	source: 'Udacity', 
	// 	course_link: 'https://www.udacity.com/course/how-to-create-anything-in-android--ud802', 
	// 	image: 'https://www.udacity.com/assets/pages/cop/nd801-366a1965b856969997591244b5bad242a2bc5f91f72f0c4275a53ed1d600406a.jpg',
	// 	description: "Here is one important question Android developers ask while making apps: 'How can I do ________ in Android?' The following are versions of this question that we came across recently: How can I add radio buttons to my app? How can I play a sound? How can I navigate between multiple screens? This course is a collection of such questions and their answers. By the end of this course you will have mastered the ability to implement new Android features by reading a blog or article — this is a critical skill possessed by professional Android developers. As a result, you will also be able to use several User Interface components — like Toggle Buttons, Menus, Grid View and many more — that are central to making functional and delightful Android apps."
	// }));

	// store.dispatch(addCourseSuccess({
	// 	id: 4,
	// 	title: 'UX Design for Mobile Developers',
	// 	room: 'UX-Design',
	// 	source: 'Udacity', 
	// 	course_link: 'https://www.udacity.com/course/ux-design-for-mobile-developers--ud849', 
	// 	image: 'https://www.udacity.com/assets/pages/cop/nd801-366a1965b856969997591244b5bad242a2bc5f91f72f0c4275a53ed1d600406a.jpg',
	// 	description: "This course is optimized for the developer who is looking to efficiently learn the most important design techniques that will help them make better apps (with a focus on mobile/Android). This is a UX design course built for current (and aspiring) mobile developers. In this short course, you'll step back from your IDE and dive into the techniques that great designers use to plan and prototype amazing apps before any code is written."
	// }));



	// store.dispatch(addAnnouncement(
	// 	'Announcement 12',
	// 	'This is the 12th announcement', 
	// 	1
	// ));
	// store.dispatch(addScholar(
	// 	'Philipp Schmidt', 
	// 	'MIT Media Lab', 
	// 	'https://www.media.mit.edu/people/ps1/overview/', 
	// 	'/styles/img/community/ps1.jpg', 
	// 	"J. Philipp Schmidt is Director of Learning Innovation at the MIT Media Lab, where he leads the ML Learning initiative, teaches courses, and conducts research on learning communities. He is also a cofounder and board member of Peer 2 Peer University (P2PU), a non-profit organization that provides access to online higher education through public libraries. Philipp served on the founding board of the OpenCourseWare Consortium, co-authored the Cape Town Open Education Declaration, and is an advisor to a number of non-profit and for-profit education projects. He has received Shuttleworth and Ashoka fellowships, and came to MIT as a Media Lab Director's fellow."
	// ));
  //
	// store.dispatch(addCourse(
	// 	'Swift: Building iOS Apps', 
	// 	'Swift', 
	// 	'Flatiron School', 
	// 	'https://flatironschool.com/programs/online-swift-free-course/', 
	// 	'https://flatironschool.imgix.net/online-swift/build-ios-applications-v2.jpg?fit=crop&crop=entropy', 
	// 	"We’ll start with the fundamentals of Swift and move on to more advanced topics like Higher Order Functions, Protocols, and Extensions. Write, run, and view your code in Xcode and learn how to read warning and error messages. Use Interface Builder and Auto Layout to build interactive, visually stunning applications."
	// ));

	// store.dispatch(addCourse('Machine Learning', 'Coursea', 'https://www.coursera.org/learn/machine-learning', '/styles/img/courses/1.jpeg', "Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself. More importantly, you'll learn about not only the theoretical underpinnings of learning, but also gain the practical know-how needed to quickly and powerfully apply these techniques to new problems. Finally, you'll learn about some of Silicon Valley's best practices in innovation as it pertains to machine learning and AI.\n\nThis course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). (iii) Best practices in machine learning (bias/variance theory; innovation process in machine learning and AI). The course will also draw from numerous case studies and applications, so that you'll also learn how to apply learning algorithms to building smart robots (perception, control), text understanding (web search, anti-spam), computer vision, medical informatics, audio, database mining, and other areas."));
	// store.dispatch(addCourse('Programming for Everybody (Getting Started with Python)', 'Coursea', 'https://www.coursera.org/learn/python', '/styles/img/courses/2.jpeg', "This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python.  The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course. This course will cover Chapters 1-5 of the textbook “Python for Informatics”.   This course is equivalent to the first half of the 11-week 'Programming for Everybody (Python)' course.  Once a student completes this course, they will be ready to take more advanced programming courses. This course covers Python 2."));
	// store.dispatch(addCourse('Learning How to Learn: Powerful mental tools to help you master tough subjects', 'Coursea', 'https://www.coursera.org/learn/learning-how-to-learn', '/styles/img/courses/3.jpeg', "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We’ll learn about the how the brain uses two very different learning modes and how it encapsulates (“chunks”) information. We’ll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects. \r\rUsing these approaches, no matter what your skill levels in topics you would like to master, you can change your thinking and change your life. If you’re already an expert, this peep under the mental hood will give you ideas for: turbocharging successful learning, including counter-intuitive test-taking tips and insights that will help you make the best use of your time on homework and problem sets. If you’re struggling, you’ll see a structured treasure trove of practical techniques that walk you through what you need to do to get on track. If you’ve ever wanted to become better at anything, this course will help serve as your guide."));

	return store;
}


export default storeSetUp;


