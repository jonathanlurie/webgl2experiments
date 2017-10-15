
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

  // compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

  // create a gl program
  var program = createProgram(gl, vertexShader, fragmentShader);

  // Lookup shader attribute location (should not be done in render loop)
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // Attributes get their data from buffers so we need to create a buffer
  var positionBuffer = gl.createBuffer();
  // creating a bind point to this ressource so that other function can later access it
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // the position
  var positions = new Float32Array([
    0, 0,
    0, 0.5,
    0.7, 0
  ]);

  // put data in the positionBuffer in GPU (using the gl.ARRAY_BUFFER bind point from above).
  // The STATIC_DRAW flag tells WebGL the data will not update much
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // Now that we've put data in a buffer we need to tell the attribute
  // how to get data out of it.
  // First we need to create a collection of attribute state called a Vertex Array Object.
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  // we need to turn the attribute on
  gl.enableVertexAttribArray(positionAttributeLocation);



  // Then we need to specify how to pull the data out
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer

  // it binds the current ARRAY_BUFFER to the attribute
  gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

  // adapting the gl size on the canvas size
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  //webglUtils.resizeCanvasToDisplaySize(gl.canvas);


  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);


  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Then we need to tell it which set of buffers use and how to pull data out
  // of those buffers to supply to the attributes
  // Bind the attribute/buffer set we want.
  gl.bindVertexArray(vao);

  // finally ask WebGL to execute our GLSL program.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;

  // Because the count is 3 this will execute our vertex shader 3 times.
  // The first time a_position.x and a_position.y in our vertex shader attribute
  // will be set to the first 2 values from the positionBuffer.
  // The 2nd time a_position.xy will be set to the 2nd two values.
  // The last time it will be set to the last 2 values.
  // Because we set primitiveType to gl.TRIANGLES, each time our vertex shader
  // is run 3 times WebGL will draw a triangle based on the 3 values we set
  // gl_Position to. No matter what size our canvas is those values are in clip
  // space coordinates that go from -1 to 1 in each direction.
  // Because our vertex shader is simply copying our positionBuffer values to
  // gl_Position the triangle will be drawn at clip space coordinates
  gl.drawArrays(primitiveType, offset, count);


  console.log( positionAttributeLocation );
}
