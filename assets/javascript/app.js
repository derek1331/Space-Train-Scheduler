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
var database = firebase.database()

// 2. Button for adding Employees
$("#add").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFirst = $("#first-train").val().trim();
  var trainFrequency = $("#frequency").val().trim();

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
  var nextTrainArrival = moment().add(nextTrainMin, "m").format("hh:mm A");


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

// $("input[type='text'], input[type='number'],input[type='date']").on("keyup", function(){
//   if($("input[type='text']").val() != "" && $("input[type='number'").val() != "" && $("input[type='date'").val() != ""){
//       $("input[type='submit']").removeAttr("disabled");
//   } else {
//       $("input[type='submit']").attr("disabled", "disabled");
//   }
// });

// $("input[type='number']").on("change", function(){
//   if($("input[type='text']").val() != "" && $("input[type='number']").val() != "" && $("input[type='date']").val() != ""){
//       $("input[type='submit']").removeAttr("disabled");
//   } else {
//       $("input[type='submit']").attr("disabled", "disabled");
//   }
// });

// $(document).ready(function() {
//   var $form = $('form'), // cache
//       $inputs = $form.find(':input'), // MOD extra caching
//       $buttons = $inputs.not(':submit, :reset, :button'),
//       $fields = $inputs.not($buttons),
//       $submits = $buttons.filter(':submit');

//   $submits.prop('disabled', true); // disable submit btn
//   $fields.keyup(function() { // monitor all inputs for changes, MOD changed to keyup
//        var disable = false;
//        $fields.each(function(i, el) { // test all inputs for values
//           if ($(el).val() === '') { // MOD use jQuery to get value
//                   disable = true; // disable submit if any of them are still blank
//                   return false; // MOD stop "each" if even one field is blank... less waste
//           }
//        });
//        $submits.prop('disabled',disable);
//       });
// });

