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

  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      //store into variables
      var trainName = childSnapshot.val().name;
      console.log(trainName);
      var trainDest = childSnapshot.val().destination;
      console.log(trainDest);
      var trainFirst = childSnapshot.val().start;
      console.log(trainFirst);
      var trainFrequency = childSnapshot.val().freq;
      console.log(trainFrequency);

      //converting the military time to standard time
      var firstTrainConvert = moment(trainFirst, "HH:mm").format('hh:mm a');
      console.log(firstTrainConvert);

      //current time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      //difference between the times
      var diffTime = moment().subtract(moment(firstTrainConvert), "minutes");
      console.log("TYPE OF DiffTime: ", typeof diffTime)
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // minutes until train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    trainArrival =  moment(nextTrain).format("hh:mm")
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var newRow =$("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainArrival),
        $("<td>").text(tMinutesTillTrain)
      );
      $("#train-schedule > tbody").append(newRow)
  });
 