var config = {
  apiKey: "AIzaSyAVb1rUbfEhfqlR-CCjpCq_NlBA2qNwsMU",
  authDomain: "virtualbroker-skt.firebaseapp.com",
  databaseURL: "https://virtualbroker-skt.firebaseio.com",
  projectId: "virtualbroker-skt",
  storageBucket: "virtualbroker-skt.appspot.com",
  messagingSenderId: "903520356728"
};
firebase.initializeApp(config);

document.getElementById("name").value = "";
document.getElementById("location").value = "";
document.getElementById("bhk").value = "";
document.getElementById("area").value = "";

var db = firebase.database();
var dbRooms = db.ref().child('rooms');
var uploader = document.getElementById('uploader');
var files = "";

var images = document.getElementById("images");
images.addEventListener("change", function(e){
  files = e.target.files;
});

var submitBtn = document.getElementById("submit-btn");
submitBtn.onclick = function(){

  var dataJSON = {};

  var name = document.getElementById("name").value;
  var location = document.getElementById("location").value;
  var bhk = document.getElementById("bhk").value;
  var area = document.getElementById("area").value;

  if(name === "" || location === "" || bhk === "" || area === ""){
        alert("Empty Fields")
        return;
  }

  if(files.length < 1)
  {
    alert("Select Atleast One Image")
    return;
  }

  dataJSON["location"] = location;
  dataJSON["bhk"] = bhk;

  var val = Math.random().toString(36).substr(2, 9);

  db.ref('rooms/' + area + "/" + name).set(dataJSON);

  for(var i = 0; i<files.length; i++){
    var file = files[i];
    var storageRef = firebase.storage().ref("images/" + area + "/" + name + "/" + file.name);

    storageRef.put(file);
    storageRef.getDownloadURL().then(function(url) {
        db.ref('rooms/' + area + "/" + name + "/images").push(url);
    });
  }

  document.getElementById("name").value = "";
  document.getElementById("location").value = "";
  document.getElementById("bhk").value = "";
  document.getElementById("area").value = "";

}
