importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');
firebase.initializeApp({     
  apiKey: "AIzaSyDFrdlUinvYtWD5uL61JGFFc51-lW1GbfQ",
  authDomain: "greenandgrainscustapp.firebaseapp.com",
  databaseURL: "https://greenandgrainscustapp.firebaseio.com",
  projectId: "greenandgrainscustapp",
  storageBucket: "greenandgrainscustapp.appspot.com",
  messagingSenderId: "362296403662",
  appId: "1:362296403662:web:b1db5b976e6184fb0a929f",
  measurementId: "G-0H9RPJ5J72" 
  });

const messaging = firebase.messaging();