import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyA4XfiaGjgQXCaByvdfrXGw8zSawoNbLB8",
    authDomain: "myblogx1-6204a.firebaseapp.com",
    databaseURL: "https://myblogx1-6204a-default-rtdb.firebaseio.com",
    projectId: "myblogx1-6204a",
    storageBucket: "myblogx1-6204a.appspot.com",
    messagingSenderId: "578816826980",
    appId: "1:578816826980:web:1559ed7b0eb75ee1470971",
    measurementId: "G-PZJX0VVXWB"
  };
  // Initialize Firebase
  var firebaseDB = firebase.initializeApp(firebaseConfig);
  export default firebaseDB.database().ref()