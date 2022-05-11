var ob2_x=new Array(),ob2_y=new Array(), ob2_z=new Array(), ob2_rot=new Array(), default_rot_2=new Array();
var own_rot_2=new Array();
var speed_2=0;
const num_ob2=5;
function reinit_2_level(level){
  for(i=0;i<num_ob2;i++)
    own_rot_2[i] = 0.1 * level * Math.random() - (0.05 * level); 
  speed_2 = 0.15 * level + 0.1;
}
function initOb2Buffers(gl) {
  const scale=3;
  const positions = [
  //I-1
  scale*0.707,  scale*0.707, -1,
  scale, 0, -1,
  scale, 0, 0,
  scale*0.707,  scale*0.707, 0,

  //I-2
  scale*0.707,  scale*0.707, -1,
  0, scale, -1,
  0, scale, 0,
  scale*0.707,  scale*0.707, 0,

  //II-2
  -scale*0.707,  scale*0.707, -1,
  -scale, 0, -1,
  -scale, 0, 0,
  -scale*0.707,  scale*0.707, 0,

  //II-1
  -scale*0.707,  scale*0.707, -1,
  0, scale, -1,
  0, scale, 0,
  -scale*0.707,  scale*0.707, 0,
  ];
  positions.push(0,0,0);
  positions.push(scale*Math.cos(Math.PI*0/180),scale*Math.sin(Math.PI*0/180),0);
  positions.push(scale*Math.cos(Math.PI*45/180),scale*Math.sin(Math.PI*45/180),0);
  positions.push(scale*Math.cos(Math.PI*90/180),scale*Math.sin(Math.PI*90/180),0);
  positions.push(0,0,0);
  positions.push(scale*Math.cos(Math.PI*90/180),scale*Math.sin(Math.PI*90/180),0);
  positions.push(scale*Math.cos(Math.PI*135/180),scale*Math.sin(Math.PI*135/180),0);
  positions.push(scale*Math.cos(Math.PI*180/180),scale*Math.sin(Math.PI*180/180),0);
  positions.push(0,0,-1);
  positions.push(scale*Math.cos(Math.PI*0/180),scale*Math.sin(Math.PI*0/180),-1);
  positions.push(scale*Math.cos(Math.PI*45/180),scale*Math.sin(Math.PI*45/180),-1);
  positions.push(scale*Math.cos(Math.PI*90/180),scale*Math.sin(Math.PI*90/180),-1);
  positions.push(0,0,-1);
  positions.push(scale*Math.cos(Math.PI*90/180),scale*Math.sin(Math.PI*90/180),-1);
  positions.push(scale*Math.cos(Math.PI*135/180),scale*Math.sin(Math.PI*135/180),-1);
  positions.push(scale*Math.cos(Math.PI*180/180),scale*Math.sin(Math.PI*180/180),-1);

  positions.push(scale*Math.cos(Math.PI*0/180),scale*Math.sin(Math.PI*0/180),0);
  positions.push(scale*Math.cos(Math.PI*180/180),scale*Math.sin(Math.PI*0/180),0);
  positions.push(scale*Math.cos(Math.PI*0/180),scale*Math.sin(Math.PI*0/180),-1);
  positions.push(scale*Math.cos(Math.PI*180/180),scale*Math.sin(Math.PI*0/180),-1);
  for(i=1;i<=num_ob2;i++)
  {
    ob2_x.push(0);
    ob2_y.push(1);
    ob2_z.push(-60*i-30);
    ob2_rot.push(0);
    default_rot_2.push(30);
  }

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

    //Front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    //Back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    //Bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
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
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
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
    32, 33, 34,     33, 34, 35,
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

function draw_ob2(gl, programInfo, buffers,projectionMatrix,texture)
{
  if(u!=0)
  {
    v-=g;
    for(i=0;i<num_ob2;i++)
    {
      ob2_y[i] = ((u*u) - (v*v))/(2*g)+1;
      if(ob2_y[i]>=1)
        ob2_y[i]=1;
    }
    if(ob2_y[0]==1)
    {
      v=0;
      u=0;
    }
  }
  for(i=0;i<num_ob2;i++)
  {

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    // position=ob2_z-3*i;
    // if(position>=5)
    // {
    //   position = -900;
    // }

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [ob2_x[i], ob2_y[i], ob2_z[i]]);  // amount to translate

     mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                ob1_rot[i]*Math.PI/180 + default_rot_2[i],   // amount to rotate in radians
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

    //Tell WebGL how to pull out the colors from the color buffer
    //into the vertexColor attribute.


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
   const vertexCount = 54;
   const type = gl.UNSIGNED_SHORT;
   const offset = 0;
   gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
 }
}
}

function set_ob2_position(x,y,z)
{
  ob2_x=x;
  ob2_y=y;
  ob2_z=z;
}

function ob2_tick()
{
  for(i=0;i<num_ob2;i++)
  {
    default_rot_2[i]+=own_rot_2[i];
    if(default_rot_2[i]>2*Math.PI)
    {
      default_rot_2[i]-=2*Math.PI;
    }
    if(default_rot_2[i]<0)
    {
      default_rot_2[i]+=2*Math.PI;
    }
    ob2_z[i]+=speed_2;
  }
  for(i=0;i<num_ob2;i++)
  {
    if(ob2_z[i]>=3)
      ob2_z[i]=ob2_z[(i-1+num_ob2)%num_ob2]-60;
  }
}

function ob2_rotate(rot)
{
  for(i=0;i<num_ob2;i++)
  {
    ob2_rot[i]+=rot;
  }
}

function ob2_jump(vel)
{
  if(u==0)
  {
    u=vel;
    v=vel;
  }
}

function check_coll_2()
{
  var m;
  for (i=0;i<num_ob2;i++)
  {
    m = ob1_rot[i]*Math.PI/180 + default_rot_2[i];
    while(m<0)
      m+=Math.PI*2;
    m=(m+Math.PI*2)%(Math.PI*2);
    if(u==0)
    {
      if (m>Math.PI/2-0.05 && m<3*Math.PI/2+0.05 && Math.abs(ob2_z[i])<0.3)
        return true;
    }
    else
    {
      if((m<=Math.PI/2 || m>=3*Math.PI/2) && ob2_y[i]<=-1 && Math.abs(ob2_z[i])<0.4)
        return true;
      else if((m>=Math.PI/2 && m<=3*Math.PI/2) && ob2_y[i]>=-1 && Math.abs(ob2_z[i])<0.4)
        return true;
    }
  }
  return false;
}
exports={
  initOb2Buffers,
  draw_ob2,
  ob2_tick,
  ob2_jump,
  ob2_rotate,
  check_coll_2,
  reinit_2_level,
}