

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

});
