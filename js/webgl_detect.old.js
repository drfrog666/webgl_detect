//global variables

var webgl_page = "3d.xhtml";	
var twod_page = "webgl_detect.xhtml";
var cookie_name;
var get_webgl=1;
var troubleshoot_webgl = 1;

function create_div(id,inner_html)
{

  var div= document.createElement("div");
  div.id = id;
  div.setAttribute("style","font-size:66%");
  div.innerHTML = inner_html;
  return div;

}

//remove cookie link helper
function remove_cookie_link(){

  var alink= document.createElement("a");
  alink.setAttribute("href","webgl_detect.xhtml");
  alink.setAttribute("onclick",'$.removeCookie("remember_webgl");');
  alink.appendChild( document.createTextNode("Remove webgl cookie" ));
  document.body.insertBefore(alink, document.body.firstChild);    

}
 

// modal dialog im using a bit lengthy on values
function dialog_callback(title,ident,div,buttons,height,width){
  document.body.appendChild(div);

  $(ident).dialog({
          title: title,
          resizable: false,
          height:height,
          width:width,
          modal: true,
          buttons: buttons
  });
  
}


//main detect on load
$(window).load(function() {

  var sPath = window.location.pathname;
  var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

  if ( $.cookie("remember_webgl") ){
    if (sPage != webgl_page && $.cookie("remember_webgl")=="3D"){
      window.location=webgl_page;
    }
    remove_cookie_link();
  }
  else{

      if ( sPage == twod_page){

  if (!window.WebGLRenderingContext && get_webgl==1) {
    getwebgl_dialog =create_div("getwebgl-dialog","<center><h2><a href='http://get.webgl.org' target='_blank'>Browsers With WebGL Support</a></h2></center>");
    dialog_callback("WebGL Browser Support","#getwebgl-dialog",getwebgl_dialog,{},120,330);
  }
  else {
   var canvas= document.createElement("canvas");
   canvas.id = "myCanvas";
    document.body.appendChild(canvas);
    var webgl_canvas = document.getElementById("myCanvas");
    gl = webgl_canvas.getContext("webgl") || webgl_canvas.getContext("experimental-webgl");
    if (!gl) {
      if( troubleshoot_webgl==1){
        trouble_dialog = create_div("trouble-dialog","<center><h2><a href='http://get.webgl.org/troubleshooting' target='_blank'>WebGL TroubleShooting Guide</a></h2></center>");
        dialog_callback("WebGL Troubleshooting","#trouble-dialog",trouble_dialog,{},120,330);
      }
    }
    else {
      threed_dialog = create_div("webgl-dialog", '<center><h2>Switch to 3D page?<br/>Remember this decision? <input type="checkbox" id="remember"/></h2></center>');
      buttons = {
        "3D": function() {
              $( this ).dialog( "close" );
              if ( $("#remember").prop("checked") ){
                $.cookie("remember_webgl", "3D");
              }
              window.location = webgl_page;
        },
        "2D": function() {
              $( this ).dialog( "close" );
              if ( $("#remember").prop("checked") ) {
                $.cookie("remember_webgl", "2D");  
                remove_cookie_link();
                $("#webgl-dialog").remove();
              }
        }
      };
 
      dialog_callback("WebGL Detected","#webgl-dialog",threed_dialog,buttons,240,300);
   
    }
    $("#myCanvas").remove(); 
  }


      
      }

}

      
});
