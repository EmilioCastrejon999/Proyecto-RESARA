$(window).bind("load",function(){

    var mostrarEnAlerta;
    if (checkCookie("Usuario")== true){
    mostrarEnAlerta =  getCookie("Usuario");
    }
    else {
      mostrarEnAlerta = "Inicia Sesion";
    }

    alert(mostrarEnAlerta);

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
      }
      else {
        return false;
      }
  }

});
