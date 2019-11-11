const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyCDf_5yhPZwHWTfugDxXogb_BdfsF3EID0",
    authDomain: "brians-ostebiks-jn.firebaseapp.com",
    databaseURL: "https://brians-ostebiks-jn.firebaseio.com",
    projectId: "brians-ostebiks-jn",
    storageBucket: "brians-ostebiks-jn.appspot.com",
    messagingSenderId: "529321237167",
    appId: "1:529321237167:web:142fd1dbd47eeb180d525a"
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;