// event: #814374
// memory: #51A39D
// sent text: #B7695C
// high five: #CDBB79
//

claire = {
	key: 1,
	name: 'Claire R.',
	photo: require('./assets/profilePictures/claire.png'),
	fire: require('./assets/fires/small_fire.png'),
	currFire: 'small',
	bgFire: require('./assets/fires/calm.jpg'),
	lastConnected:"today", 
	status: "Having a tough week...really missing home :(",
	statusAge: "2 days ago",
	number: '+16502791863',
}

alisha = {
	key: 5,
	name: 'Alisha L.',
	photo: require('./assets/profilePictures/alisha.png'),
	fire: require('./assets/fires/small_fire.png'),
	currFire: 'small',
	bgFire: require('./assets/fires/calm.jpg'),
	lastConnected:"today", 
	status: "Landed an internship for the summer! Hello, Seattle!",
	statusAge: "today",
	number: '+16502791863',
}

raj = {
	key: 6,
	name: 'Raj T.',
	photo: require('./assets/profilePictures/raj.png'),
	fire: require('./assets/fires/small_fire.png'),
	currFire: 'small',
	lastConnected:"today", 
	bgFire: require('./assets/fires/calm.jpg'),
	status: null,
	statusAge: null,
	number: '+16502791863',
}

john = {
	key: 2,
	name: 'John S.',
	photo: require('./assets/profilePictures/john.png'),
	fire: require('./assets/fires/large_fire.png'),
	bgFire: require('./assets/fires/roaring.png'),
	currFire: 'large',
	lastConnected:"yesterday", 
	status: null,
	statusAge: null,
	number: '+16502791863',
}

nate = {
	key: 3,
	name: 'Nate G.',
	photo: require('./assets/profilePictures/nate.png'),
	fire: require('./assets/fires/medium_fire.png'),
	bgFire: require('./assets/fires/toasty.png'),
	currFire: 'medium',
	lastConnected:"4 days ago", 
	status: "Ugh, 2 midterms this week...RIP",
	statusAge: "3 days ago",
	number: '+16502791863',
}

ella = {
	key: 4,
	name: 'Ella E.',
	photo: require('./assets/profilePictures/ella.png'),
	fire: require('./assets/fires/dead_fire.png'),
	currFire: 'dead',
	bgFire: require('./assets/fires/vanishing.png'),
	lastConnected:"2 weeks ago", 
	status: null,
	statusAge: null,
	number: '+16502791863',
}

chris = {
	key: 7,
	name: 'Chris C.',
	photo: require('./assets/profilePictures/chris.png'),
	fire: require('./assets/fires/dead_fire.png'),
	currFire: 'dead',
	bgFire: require('./assets/fires/vanishing.png'),
	lastConnected:"3 weeks ago", 
	status: "Culture II is fire!!!!",
	statusAge: "1 week ago",
	number: '+16502791863',
}


friends = {allData: [
		claire,
		john,
		nate,
		ella,
		raj,
		alisha,
		chris
	],
	currData: [
		claire,
		john,
		nate,
		ella,
		raj,
		alisha,
		chris
	]
}

export default friends
