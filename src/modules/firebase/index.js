// @ts-ignore
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDbwDq8QfVoDbMNJCwlkSzfot0rK-gAxmg',
  authDomain: 'protobot-rawdata.firebaseapp.com',
  databaseURL: 'https://protobot-rawdata.firebaseio.com',
  projectId: 'protobot-rawdata',
  storageBucket: 'protobot-rawdata.appspot.com',
  messagingSenderId: '152034338524',
  appId: '1:152034338524:web:d343041e00ee49b1'
};
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database };
