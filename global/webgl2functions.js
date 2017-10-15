
/**
* Compile a shader from source
* @param {Object} gl - WebGL2 rendering context (WebGL2RenderingContext)
* @param {Number} type - WebGL2 constant gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
* @param {String} source - string of the shader
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
}
