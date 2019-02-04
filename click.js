function onSaveClick(button){
  var defaultDatabase = firebase.database();
  var key = document.getElementById("key").value;
  var ref = firebase.database().ref(key);
  var value = document.getElementById("value").value;
  ref.set(value);
  document.getElementById("log").value = "onSaveClick done";
}

function onCreateUserClick(button){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(x){
    document.getElementById("log").value = JSON.stringify(x);
    updateAuthState(x.user);
  }).catch(function(error) {
    var errorCode = error.code;
    document.getElementById("log").value = error.message;
    console.log(error);
  });  
}

function onLoginClick(button){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(x){
    document.getElementById("log").value = JSON.stringify(x);
    updateAuthState(x.user);
  }).catch(function(error) {
    var errorCode = error.code;
    document.getElementById("log").value = error.message;
  });
}

function onLogoutClick(button){
  firebase.auth().signOut().then(function(x){
    document.getElementById("log").value = JSON.stringify(x);    
    updateAuthState(x.user);
  });
}

function onDeleteUserClick(button){
}
