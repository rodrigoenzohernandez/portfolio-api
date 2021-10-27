var express = require("express");
var router = express.Router();

//TODO: move to a controller
//TODO: use secrets

var firebase = require("firebase/app");
require("firebase/database");

const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

console.log("DATABASE_URL")

console.log(process.env.DATABASE_URL)

var config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
firebase.initializeApp(config);

router.get("/", function (req, res, next) {

  console.log(config)

  try {
    const dbRef = firebase.database().ref();
    dbRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          res.send(snapshot.val());
        } else {
          res.send("No data available");
        }
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
