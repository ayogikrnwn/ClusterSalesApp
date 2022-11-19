import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config= {
    apiKey: "AIzaSyDVeEzNFR0vqvj-Yo8747-4_QbBBQus-5g",
    authDomain: "clusterapp-44a23.firebaseapp.com",
    databaseURL: "https://clusterapp-44a23-default-rtdb.firebaseio.com",
    projectId: "clusterapp-44a23",
    storageBucket: "clusterapp-44a23.appspot.com",
    messagingSenderId: "732046812079",
    appId: "1:732046812079:web:f981889020f8ad4b97855a"
  


}

const Fire = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default Fire;