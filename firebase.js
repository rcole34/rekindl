import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCgrNCNxDVCYPa7IBq3d0zQFCWTaNNsQxg",
  authDomain: "rekindl-27d5f.firebaseapp.com",
  databaseURL: "https://rekindl-27d5f.firebaseio.com",
  storageBucket: "rekindl-27d5f.appspot.com"
};
firebase.initializeApp(firebaseConfig);

export default firebase