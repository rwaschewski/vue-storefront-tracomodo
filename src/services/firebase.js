import * as firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBOQSV8fiWxCqJIaMEF69L_7J8AGMAFL2U",
  authDomain: "tracomodo-8ad32.firebaseapp.com",
  databaseURL: "https://tracomodo-8ad32.firebaseio.com",
  projectId: "tracomodo-8ad32",
  storageBucket: "",
  messagingSenderId: "610020638431"
}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}