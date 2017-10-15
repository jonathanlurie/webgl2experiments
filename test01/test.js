
launch();

function launch(){

  // init the webgl2 context in a canvas
  var canvas = document.getElementById("c");
  var gl = canvas.getContext("webgl2");

  // if WebGL2 not available
  if (!gl) {
    alert("WebGL2 not available.")
    return;
  }

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

  
}
