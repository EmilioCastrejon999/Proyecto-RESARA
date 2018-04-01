if ( checkCookie("attempt")  == false){
setCookie("attempt", 3, 0.0007);
}

// Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

if ( username == "Formget" && password == "formget#123"){

  if (checkCookie("Usuario")== false){
    setCookie("Usuario" , username);
  }

alert ("Login successfully");
window.location = "menu.html"; // Redirecting to other page.
return false;
}
else{
// Disabling fields after 3 attempts.
var attempt = getCookie("attempt");

if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
else {
  attempt --;// Decrementing by one.
  setCookie("attempt", attempt, 0.0007);

  alert("You have left "+attempt+" attempt;");
}

}
}

function setCookie(cname, cvalue, exdays) {
  if (exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  else {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var cookie = getCookie(cname);
    if (cookie != "") {
      return true;
    } else {
      return false;
    }
}
