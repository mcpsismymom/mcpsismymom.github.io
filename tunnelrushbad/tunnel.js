var tunnel_x=0,tunnel_y=1;
var tunnel_z=new Array();
var tunnel_rot=0,u=0,v=0,g=-0.004;
var speed=0;
function set_speed(level)
{
  speed = 0.15 * level + 0.1;

}
function initTunnelBuffers(gl) {
  const scale=2;
  const positions = [
  //I-1
  scale*0.707,  scale*0.707, -3,
  scale, 0, -3,
  scale, 0, 0,
  scale*0.707,  scale*0.707, 0,

  //I-2
  scale*0.707,  scale*0.707, -3,
  0, scale, -3,
  0, scale, 0,
  scale*0.707,  scale*0.707, 0,

  //II-2
  -scale*0.707,  scale*0.707, -3,
  -scale, 0, -3,
  -scale, 0, 0,
  -scale*0.707,  scale*0.707, 0,

  //II-1
  -scale*0.707,  scale*0.707, -3,
  0, scale, -3,
  0, scale, 0,
  -scale*0.707,  scale*0.707, 0,

  //III-1
  -scale*0.707,  -scale*0.707, -3,
  -scale, 0, -3,
  -scale, 0, 0,
  -scale*0.707,  -scale*0.707, 0,

  //III-2
  -scale*0.707,  -scale*0.707, -3,
  0, -scale, -3,
  0, -scale, 0,
  -scale*0.707,  -scale*0.707, 0,

  //IV-2
  scale*0.707,  -scale*0.707, -3,
  scale, 0, -3,
  scale, 0, 0,
  scale*0.707,  -scale*0.707, 0,

  //IV-1
  scale*0.707,  -scale*0.707, -3,
  0, -scale, -3,
  0, -scale, 0,
  scale*0.707,  -scale*0.707, 0,

  ];

  for(i=0;i<100;i++)
    tunnel_z.push(-3*i);

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(positions),
    gl.STATIC_DRAW);


  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  const vertexNormals = [
    // I-1
    1,  0.414,  0.0,
    1,  0.414,  0.0,
    1,  0.414,  0.0,
    1,  0.414,  0.0,

    // I-2
    0.414,  1, 0.0,
    0.414,  1, 0.0,
    0.414,  1, 0.0,
    0.414,  1, 0.0,

    // II-2
    -1,  0.414,  0.0,
    -1,  0.414,  0.0,
    -1,  0.414,  0.0,
    -1,  0.414,  0.0,


    // II-1
    -0.414,  1, 0.0,
    -0.414,  1, 0.0,
    -0.414,  1, 0.0,
    -0.414,  1, 0.0,

    // III-1
    -1,  -0.414,  0.0,
    -1,  -0.414,  0.0,
    -1,  -0.414,  0.0,
    -1,  -0.414,  0.0,

    // III-2
    -0.414,  -1, 0.0,
    -0.414,  -1, 0.0,
    -0.414,  -1, 0.0,
    -0.414,  -1, 0.0,

    // IV-2
    1,  -0.414,  0.0,
    1,  -0.414,  0.0,
    1,  -0.414,  0.0,
    1,  -0.414,  0.0,


    // IV-1
    0.414,  -1, 0.0,
    0.414,  -1, 0.0,
    0.414,  -1, 0.0,
    0.414,  -1, 0.0,

    5,0,0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                gl.STATIC_DRAW);


  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,    
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
      gl.STATIC_DRAW);

    const indices = [
    0,  1,  2,      0,  2,  3,    
    4,  5,  6,      4,  6,  7,  
    8,  9,  10,     8,  10, 11,
    12, 13, 14,     12, 14, 15,   
    16, 17, 18,     16, 18, 19,  
    20, 21, 22,     20, 22, 23,
    24, 25, 26,     24, 26, 27,
    28, 29, 30,     28, 30, 31,
    ];


  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.


  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    normal: normalBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

function draw_tunnel(gl, programInfo, buffers,projectionMatrix,texture)
{
  if(u!=0)
  {
    v-=g;
    tunnel_y = ((u*u) - (v*v))/(2*g)+1;
    if(tunnel_y>=1)
    {
      tunnel_y=1;
      v=0;
      u=0;
    }
  }
  for(i=0;i<100;i++)
  {

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    // position=tunnel_z-3*i;
    // if(position>=5)
    // {
    //   position = -900;
    // }

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [tunnel_x, tunnel_y, tunnel_z[i]]);  // amount to translate

     mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                Math.PI/8 + tunnel_rot*Math.PI/180,   // amount to rotate in radians
                [0, 0, 1]);       // axis to rotate around

     const normalMatrix = mat4.create();
     mat4.invert(normalMatrix, modelViewMatrix);
     mat4.transpose(normalMatrix, normalMatrix);

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
    }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexNormal);
  }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);

    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
   const vertexCount = 48;
   const type = gl.UNSIGNED_SHORT;
   const offset = 0;
   gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
 }
}
}

function set_tunnel_position(x,y,z)
{
  tunnel_x=x;
  tunnel_y=y;
  tunnel_z=z;
}

function tunnel_tick()
{
  for(i=0;i<100;i++)
    tunnel_z[i]+=speed;
  for(i=0;i<100;i++)
  {
    if(tunnel_z[i]>=3)
      tunnel_z[i]=tunnel_z[(i-1+100)%100]-3;
  }
}

function tunnel_rotate(rot)
{
  tunnel_rot+=rot;
}

function tunnel_jump(vel)
{
  if(u==0)
  {
    u=vel;
    v=vel;
  }
}

exports={
  initTunnelBuffers,
  draw_tunnel,
  tunnel_tick,
  tunnel_jump,
  set_speed,
  tunnel_rotate,
}