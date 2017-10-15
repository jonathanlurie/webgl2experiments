
/**
* Compile a shader from source
* @param {Object} gl - WebGL2 rendering context (WebGL2RenderingContext)
* @param {Number} type - WebGL2 constant gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
* @param {String} source - string of the shader
* @return {Object} a compiled shader
*/
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}


/**
* Create a GL program from the GL context and both shaders
* @param {Object} gl - webgl2 context
* @param {Object} vertexShader - vertex shader object (not source)
* @param {Object} fragmentShader - fragment shader object (not source)
* @return {Object} a compiled GL program
*/
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}
