import {Segment, Permissions, Notifications } from 'expo';
import {AsyncStorgae, Alert} from 'react-native';
import firebase from './firebase.js';

registerForNotifications = async function() {
    var currUser = firebase.auth().currentUser;
    console.log('Got current user');
    firebase.database().ref('users').child(currUser.uid).child('pushToken').once('value', async (snapshot) => {
        if (snapshot == null) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            console.log(existingStatus);

            if (existingStatus !== 'granted') {
              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
              finalStatus = status;
            }

            if (finalStatus !== 'granted') return;

            let pushToken = await Notifications.getExpoPushTokenAsync();
            firebase.database().ref('users').child(currUser.uid).child('pushToken').set(pushToken);
        } else {
            console.log("Already stored push token");
        }
    }).catch(function(error) {
        console.log(error.message);
    })
}

handleNotifications = (notification) => {
    console.log(notification);
    let notData = notification['data'];
    let title = notData['title'];
    let body = notData['body'];
    if (notification['origin'] === 'received') Alert.alert(title, body);
};

export {registerForNotifications, handleNotifications};
