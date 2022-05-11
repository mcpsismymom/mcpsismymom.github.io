var game_over=0;
var gray=0;
var pause=0;
var game_start=0;
var flash=0;
var score=0;
var level=-1;
var flashAudio = new Audio('assets/sounds/flash.mp3')
var bg = new Audio('assets/sounds/inter.mp3')
bg.volume=1;
bg.loop=true;
var crashAudio = new Audio('assets/sounds/crash.wav')
crashAudio.volume=0.3;
var flash_intervals = [1500,1000,1000,500,500];
var Key = {
  _pressed: {},

  LEFT: 37,
  A: 65,
  D: 68,
  RIGHT: 39,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
main();
function restart()
{
  location.reload();
}
function startGame()
{
  game_start=1;
  bg.play();
  document.getElementById('start').style.visibility = 'hidden';
  document.getElementById('scoreDiv').style.visibility = '';
  document.getElementById('levelDiv').style.visibility = '';
}
function main() {

  Mousetrap.bind('space',function(){tunnel_jump(-0.15); ob1_jump(-0.15); ob2_jump(-0.15);});
  Mousetrap.bind('p',function(){
    if (pause==0)
    {
      pause=1;
      bg.pause();
      document.getElementById('pauseDiv').style.visibility = '';
    }
    else
    {
      pause=0;
      bg.play();
      document.getElementById('pauseDiv').style.visibility = 'hidden';
    }
  });
  Mousetrap.bind('g',function(){gray=(gray+1)%2;});
  const canvas=document.querySelector('#your_canvas');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  /*========================= GET WEBGL CONTEXT ========================= */
  const gl = canvas.getContext("webgl");
  if(!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.") ;
    return false;
  }

  /*========================= SHADERS ========================= */
  /*jshint multistr: true */
  const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;
  
  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform highp float uFlash;
  uniform int uLevel;

  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.3 + uFlash, 0.3 + uFlash, 0.3 + uFlash);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0, -1, 1));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    if(uLevel==1 || uLevel==3)
      vLighting = ambientLight + (directionalLightColor * directional);
    else
      vLighting = vec3(1.0 + uFlash, 1.0 + uFlash, 1.0 + uFlash);
  }
  `;

  const fsSource = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;
  uniform bool uGray;
  uniform highp float uFlash;

  void main(void) {
    if(uGray)
    {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord).rgba;
      highp float grayScale = dot(texelColor.rgb, vec3(0.199, 0.587, 0.114));
      highp vec3 grayImage = vec3(grayScale+uFlash, grayScale+uFlash, grayScale+uFlash);
      gl_FragColor = vec4(grayImage * vLighting, texelColor.a);
    }
    else
    {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord).rgba;
      highp vec3 Image = vec3(texelColor.r + uFlash, texelColor.g + uFlash, texelColor.b + uFlash);
      gl_FragColor = vec4(Image * vLighting, texelColor.a);
    }

  }
  `;


   // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers_tunnel = initTunnelBuffers(gl);
  const buffers_ob1 = initOb1Buffers(gl);
  const buffers_ob2 = initOb2Buffers(gl);
  const texture1 = loadTexture(gl, 'assets/tunnel/fut2.jpg');
  const texture2 = loadTexture(gl, 'assets/tunnel/sci2.jpg');
  const texture3 = loadTexture(gl, 'assets/tunnel/space4.jpg');
  const texture4 = loadTexture(gl, 'assets/tunnel/fut1.jpg');
  const texture5 = loadTexture(gl, 'assets/tunnel/lava3.jpg');
  const texture1_ob = loadTexture(gl, 'assets/obstacles/wood.jpg');
  const texture2_ob = loadTexture(gl, 'assets/obstacles/space3.jpg');
  const texture3_ob = loadTexture(gl, 'assets/obstacles/galaxyTexture.jpg');
  const texture4_ob = loadTexture(gl, 'assets/obstacles/sci3.jpg');
  const texture5_ob = loadTexture(gl, 'assets/obstacles/wood.jpg');
  const texture = [texture1,texture2,texture3,texture4,texture5];
  const texture_ob = [texture1_ob,texture2_ob,texture3_ob,texture4_ob,texture5_ob];

  // Draw the scene
  function render(now)
  {
    if(Key.isDown(Key.LEFT) || Key.isDown(Key.A))
    {
      tunnel_rotate(2);
      ob1_rotate(2);
      ob2_rotate(2);
    }
    if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D))
    {
      tunnel_rotate(-2);
      ob1_rotate(-2);
      ob2_rotate(-2);
    }
    if(!game_over)
    {
      if(!pause)
      {
        if(level==-1)
          drawScene(gl, programInfo, buffers_tunnel,buffers_ob1,buffers_ob2,texture[0],texture_ob[0]);
        else
          drawScene(gl, programInfo, buffers_tunnel,buffers_ob1,buffers_ob2,texture[level],texture_ob[level]);

      }
      requestAnimationFrame(render);
    }
  }
  requestAnimationFrame(render);
}


function drawScene(gl, programInfo, buffers_tunnel,buffers_ob1,buffers_ob2,texture,texture_ob) {

  gl.clearColor(0.0, 0.0, 0.0, 0.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 1000.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
   fieldOfView,
   aspect,
   zNear,
   zFar);
  draw_ob1(gl, programInfo, buffers_ob1,projectionMatrix,texture_ob);
  draw_ob2(gl, programInfo, buffers_ob2,projectionMatrix,texture_ob);
  draw_tunnel(gl, programInfo, buffers_tunnel,projectionMatrix,texture);
  if(game_start)
  {
    if(score%1500==0 && level<5)
    {
      level++;
      reinit_1_level(level);
      reinit_2_level(level);
      set_speed(level);
    }
    tunnel_tick();
    ob1_tick();
    ob2_tick();
    score++;
    if(score%flash_intervals[level]==0)
    {
      flashAudio.play();
      flash=0.9;
    }
    document.getElementById('score').innerHTML='Distance: ' + score + 'm';
    document.getElementById('level').innerHTML='Level: ' + (level+1);
  }
  if(check_coll_1())
  {
    crashAudio.play();
    bg.pause();
    document.getElementById('restart').style.visibility = '';
    game_over=1;
  }
  if(check_coll_2())
  {
    crashAudio.play();
    bg.pause();
    document.getElementById('restart').style.visibility = '';
    game_over=1;
  }
  var GrayBuffer = gl.getUniformLocation(programInfo.program, "uGray");
  gl.uniform1i(GrayBuffer, gray); 
  var LevelBuffer = gl.getUniformLocation(programInfo.program, "uLevel");
  gl.uniform1i(LevelBuffer, level);  
  var FlashBuffer = gl.getUniformLocation(programInfo.program, "uFlash");
  gl.uniform1f(FlashBuffer, flash);  
  if(flash>0)
    flash-=0.01;
  else
    flash=0;

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    width, height, border, srcFormat, srcType,
    pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
      srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
     } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
     }
   };
   image.src = url;

   return texture;
 }

 function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}