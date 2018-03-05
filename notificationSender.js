import firebase from './firebase.js';

PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

sendNotification = function(uid, mTitle, mBody) {

    firebase.database().ref('users').child(uid).child('pushToken').once('value', (snapshot) => {
        if (snapshot != null) {
            fetch(PUSH_ENDPOINT, createRequestObject(snapshot.val(), mTitle, mBody));
        } else console.log('No push token found');
    });
}

createRequestObject = function(pushToken, mTitle, mBody) {
    return ({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip,deflate',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: pushToken,
            title: mTitle,
            body: mBody,
            data: JSON.stringify({
                title: mTitle,
                body: mBody
            })
        })
    })
}

export {sendNotification};