$(document).ready(function() {
    $('#M2In').keypress(function(e){
	if(e.which == 13){
	  $('#M2Out').append("Bravo, you just hit enter!\n");
	  $('#M2Out').append( getSelected());
	}
      });

    $("#send").click(sendCallback);
    $("#reset").click(resetCallback);
});

function resetCallback(e) {
  if (!sendToM2( ">>RESET<<", "We are resetting the current M2 session.\n")) {
    $("#M2Out").val($("#M2Out").val() + "<b>Something Broke! HELP!</b>");
  }
  $("#M2Out").val("");
}

function sendCallback(e) {
  var str = $("#M2in").getSelected();
  alert ('doing send callback --' + str + '-');
  sendToM2( str, "Session initialized successfully! ");
}

// return false on error
function sendToM2( myCommand, baseString ) {
  alert ('-' + myCommand + '-');
  $.post("sockets/M2Client.php", {cmd: myCommand}, function(data){
      if(data != "0") {
	alert ('-' + data + '-');
	$("#M2Out").val(baseString + data );
	scrollDown();
      } else {
	$("#M2Out").val($("#M2Out").val() + "Something Broke! HELP!");
	return false;
      }
    });
  return true;
}

function scrollDown() { 
  mySize = $('#M2Out').val().length;
  $('#M2Out').scrollTop(mySize);
  return false; // Return false to cancel the default link action
}

/* attempt to find a text selection */
/* NEEDS TO BE WRITTEN */
function getSelected() {
  return "2+7\n"
}


