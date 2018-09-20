// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvqrwcBVao72fUUadOOWlcaudNXRGWgoA",
  authDomain: "train-scheduler-956ec.firebaseapp.com",
  databaseURL: "https://train-scheduler-956ec.firebaseio.com",
  projectId: "train-scheduler-956ec",
  storageBucket: "train-scheduler-956ec.appspot.com",
  messagingSenderId: "258529099503"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// 2. Button for adding Employees
$("#add").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name")
    .val()
    .trim();
  var trainDestination = $("#destination")
    .val()
    .trim();
  var trainFirst = $("#first-train")
    .val()
    .trim();
  var trainFrequency = $("#frequency")
    .val()
    .trim();

  if (
    trainName === "" ||
    trainDestination === "" ||
    trainFirst === "" ||
    trainFrequency === ""
  ) {
    return;
  }

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    train: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  var startConverted = moment(trainFirst, "HH:mm:").subtract(1, "years");

  //Determine Current Time
  var currentTime = moment().format("HH:mm");
  console.log(currentTime);

  //Determine difference between current time and trainStart
  var timeDifference = moment().diff(moment(startConverted), "minutes");
  console.log(timeDifference);

  //Determine Remaining time
  var remainder = timeDifference % trainFrequency;
  var nextTrainMin = trainFrequency - remainder;

  // format next arrival time
  var nextTrainArrival = moment()
    .add(nextTrainMin, "m")
    .format("hh:mm A");

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirst);
  console.log(trainFrequency);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrainArrival),
    $("<td>").text(nextTrainMin)
  );

  // Append the new row to the table
  $("#table").append(newRow);
});

