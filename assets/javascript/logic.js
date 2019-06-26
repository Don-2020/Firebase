var firebaseConfig = {
    apiKey: "AIzaSyCNYduhgllJLbjHfOUcRFyoaCwL7Bd_qsc",
    authDomain: "project-first-20d9c.firebaseapp.com",
    databaseURL: "https://project-first-20d9c.firebaseio.com",
    projectId: "project-first-20d9c",
    storageBucket: "project-first-20d9c.appspot.com",
    messagingSenderId: "882588732723",
    appId: "1:882588732723:web:16518218c5a64d62"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  //button for adding train info
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      //user input
      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainFirst = $("#initial-time-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();

      //create local "temporary object for holding train data
      var newTrain = {
          name: trainName,
          destination: trainDest,
          start: trainFirst,
          freq: trainFrequency
      }

      database.ref().push(newTrain);
      console.log(newTrain.name)
      console.log(newTrain.destination)
      console.log(newTrain.start)
      console.log(newTrain.freq)

      //clear all textboxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#initial-time-input").val("");
      $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(snapshot) {
      
  })