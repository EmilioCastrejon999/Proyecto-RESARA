

function openPage(evt, page) {

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(page).style.display = "block";
  evt.currentTarget.className += " active";


   $(document).find(".tabcontent").style.display = "none";

   $(document).find(".tablinks").className.replace(" active", "");

}

$('.tablinks').on('click', function(e) {

});


$(window).bind("load",function(){
  $("#PrimerBoton").click(openPage(event, 'Page1'));

  var mostrarEnAlerta;
  if (checkCookie("Usuario")== true){
  mostrarEnAlerta =  getCookie("Usuario");
  }
  else {
    mostrarEnAlerta = "Inicia Sesion"
  }

  alert(mostrarEnAlerta)
});


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
