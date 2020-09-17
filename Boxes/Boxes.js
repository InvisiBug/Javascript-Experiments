////////////////////////////////////////////////////////////////////////
//  Matthew Kavanagh 2017
//
//  Boxes
//  Boxes.js
//  2017
//  *********
////////////////////////////////////////////////////////////////////////
//
// #     #
// #     #   ##   #    # #####  #      ###### #####   ####
// #     #  #  #  ##   # #    # #      #      #    # #
// ####### #    # # #  # #    # #      #####  #    #  ####
// #     # ###### #  # # #    # #      #      #####       #
// #     # #    # #   ## #    # #      #      #   #  #    #
// #     # #    # #    # #####  ###### ###### #    #  ####
//
////////////////////////////////////////////////////////////////////////
window.onload = init;
window.onresize = resizeCanvas;

window.onkeydown = keydown;
window.onkeyup = keyUp;

setInterval(update, 33); // call update every n miliseconds

////////////////////////////////////////////////////////////////////////
//
//  #     #
//  #     #   ##   #####  #   ##   #####  #      ######  ####
//  #     #  #  #  #    # #  #  #  #    # #      #      #
//  #     # #    # #    # # #    # #####  #      #####   ####
//   #   #  ###### #####  # ###### #    # #      #           #
//    # #   #    # #   #  # #    # #    # #      #      #    #
//     #    #    # #    # # #    # #####  ###### ######  ####
//
////////////////////////////////////////////////////////////////////////
var up = false; // Keys
var down = false;
var left = false;
var right = false;
var forward = false;
var backward = false;

var areaHeight = 1000;
var areaWidth = 1000;

// Placeholder for dimensions
// var screen = new Object(),
//     width,
//     height;

var distance = 10;

var backgroundColour = "rgb(0,0,0";

var totalBoxes = 50;

// var location = new Array();
var points = new Array();
var cameraPosition = new Array();
var colours = new Array();

var focalLength = 500;
////////////////////////////////////////////////////////////////////////
//
//  #     #                                   #####
//  #  #  # # #    # #####   ####  #    #    #     #  ####  #    # ##### #####   ####  #
//  #  #  # # ##   # #    # #    # #    #    #       #    # ##   #   #   #    # #    # #
//  #  #  # # # #  # #    # #    # #    #    #       #    # # #  #   #   #    # #    # #
//  #  #  # # #  # # #    # #    # # ## #    #       #    # #  # #   #   #####  #    # #
//  #  #  # # #   ## #    # #    # ##  ##    #     # #    # #   ##   #   #   #  #    # #
//   ## ##  # #    # #####   ####  #    #     #####   ####  #    #   #   #    #  ####  ######
//
////////////////////////////////////////////////////////////////////////
function init() {
  canvas = document.getElementById("canvas");
  paint = canvas.getContext("2d");
  resizeCanvas();

  cameraPosition[0] = 0; // X
  cameraPosition[1] = 0; // Y
  cameraPosition[2] = 0; // Z

  for (i = 0; i < totalBoxes; i++) {
    points[i] = new Array();
    points[i][0] = Math.floor(Math.random() * width - 50) + 50; // Box centre X coordinate (50 -> width -50)
    points[i][1] = Math.floor(Math.random() * height - 50) + 50; // Box centre Y coordinate
    // points[i][2] = Math.floor(Math.random() * height - 50) + 50; // Box centre Z coordinate
    // points[i][3] = Math.floor(Math.random() * 100) + 1; // Box width
    // points[i][4] = Math.floor(Math.random() * 100) + 1; // Box height
    points[i][2] = Math.floor(Math.random() * 100) + 10; // Box centre Z coordinate
    points[i][3] = 100; // Box width
    points[i][4] = 100; // Box height
    points[i][5] = 100; // Box depth

    colours[i] = new Array();
    colours[i][0] = Math.round(Math.random() * 255); // Red value of box
    colours[i][1] = Math.round(Math.random() * 255); // Green value of box
    colours[i][2] = Math.round(Math.random() * 255); // Blue value of box

    console.log(
      "Box " +
        [i] +
        " Position: X = " +
        points[i][0] +
        " Y = " +
        points[i][1] +
        " Z = " +
        points[i][2]
    );
  }
  update();
}

function resizeCanvas() {
  width = window.innerWidth; // -5 to remove the scroll bars
  height = window.innerHeight; // seems these dont need to be declared

  console.log(
    "Window Width = " + width + "px, Window Height = " + height + "px"
  );

  // var bread = document.getElementById('bread').offsetHeight;

  canvas.width = width;
  // canvas.height = height - bread - menu - 6;
  canvas.height = height;
}

////////////////////////////////////////////////////////////////////////
//
// #     #
// #     # #####  #####    ##   ##### ###### #####
// #     # #    # #    #  #  #    #   #      #    #
// #     # #    # #    # #    #   #   #####  #    #
// #     # #####  #    # ######   #   #      #####
// #     # #      #    # #    #   #   #      #   #
//  #####  #      #####  #    #   #   ###### #    #
//
////////////////////////////////////////////////////////////////////////
function update() {
  // x = 0, y = 1, z = 3
  if (forward) cameraPosition[1] += distance; // Y positive
  if (backward) cameraPosition[1] -= distance; // Y negative
  if (left) cameraPosition[0] -= distance; // X positive
  if (right) cameraPosition[0] += distance; // X negative
  if (up) cameraPosition[2] += distance; // Z positive
  if (down) cameraPosition[2] -= distance; // Z negative

  // console.log("Camera Position: X = " + cameraPosition[0] + " Y = " + cameraPosition[1] + " Z = " + cameraPosition[2]);
  draw();
}

function draw() {
  paint.fillStyle = backgroundColour;
  paint.fillRect(0, 0, width, height);

  for (i = 0; i < totalBoxes; i++) {
    box(
      points[i][0],
      points[i][1],
      points[i][2],
      points[i][3],
      points[i][4],
      points[i][5],
      colours[i]
    );
  }
}

////////////////////////////////////////////////////////////////////////
//
//  ######                    #####
//  #     #  ####  #    #    #     # ###### #    # ###### #####    ##   #####  ####  #####
//  #     # #    #  #  #     #       #      ##   # #      #    #  #  #    #   #    # #    #
//  ######  #    #   ##      #  #### #####  # #  # #####  #    # #    #   #   #    # #    #
//  #     # #    #   ##      #     # #      #  # # #      #####  ######   #   #    # #####
//  #     # #    #  #  #     #     # #      #   ## #      #   #  #    #   #   #    # #   #
//  ######   ####  #    #     #####  ###### #    # ###### #    # #    #   #    ####  #    #
//
////////////////////////////////////////////////////////////////////////
box = (x, y, z, w, h, d, c) => {
  // x = 0, y = 1, z = 2

  hw = w / 2;
  hh = h / 2;
  hd = d / 2;

  var x0 = x - hw - cameraPosition[0];
  var x1 = x + hw - cameraPosition[0];

  var y0 = y - hh + cameraPosition[2];
  var y1 = y + hh + cameraPosition[2];

  var z0 = z + hh - cameraPosition[1]; // canvas 0,0 is top left while is bottom left
  var z1 = z - hh - cameraPosition[1];

  zf = focalLength / (focalLength + z0);
  zb = focalLength / (focalLength + z1);

  // console.log(zb);
  // need to ind out how to convert focal length to fov

  var x0f = x0 * zf + width / 2;
  var x1f = x1 * zf + width / 2;

  var x0b = x0 * zb + width / 2;
  var x1b = x1 * zb + width / 2;

  var y0f = y0 * zf + height / 2;
  var y1f = y1 * zf + height / 2;

  var y0b = y0 * zb + height / 2;
  var y1b = y1 * zb + height / 2;

  paint.strokeStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")"; // Set colour of box
  paint.beginPath();

  paint.moveTo(x0b, y0b); // Top left point
  paint.lineTo(x1b, y0b); // Top right point
  paint.lineTo(x1b, y1b); // Bottom Right Point
  paint.lineTo(x0b, y1b); // Bottom Left Point
  paint.lineTo(x0b, y0b); // Back to top left point

  paint.moveTo(x0b, y0b); // Top left point
  paint.lineTo(x0f, y0f);

  paint.moveTo(x1b, y1b); // Top left point
  paint.lineTo(x1f, y1f);

  paint.moveTo(x0b, y0b); // Top left point
  paint.lineTo(x0f, y0f);

  paint.moveTo(x0b, y0b); // Top left point
  paint.lineTo(x0f, y0f);

  paint.moveTo(x0f, y0f); // Top left point
  paint.lineTo(x1f, y0f); // Top right point
  paint.lineTo(x1f, y1f); // Bottom Right Point
  paint.lineTo(x0f, y1f); // Bottom Left Point
  paint.lineTo(x0f, y0f); // Back to top left point

  paint.stroke();
};

////////////////////////////////////////////////////////////////////////
//
// #    #
// #   #  ###### #   #  ####
// #  #   #       # #  #
// ###    #####    #    ####
// #  #   #        #        #
// #   #  #        #   #    #
// #    # ######   #    ####
//
////////////////////////////////////////////////////////////////////////
function keydown(event) {
  // console.log(event); // To debug button press
  switch (event.key) {
    case "Shift": {
      up = true;
      break;
    }

    case "Control": {
      down = true;
      break;
    }

    case "a": {
      left = true;
      break;
    }

    case "d": {
      right = true;
      break;
    }

    case "w": {
      forward = true;
      break;
    }

    case "s": {
      backward = true;
    }
  }
}

function keyUp(event) {
  switch (event.key) {
    case "Shift": {
      up = false;
      break;
    }

    case "Control": {
      down = false;
      break;
    }

    case "a": {
      left = false;
      break;
    }

    case "d": {
      right = false;
      break;
    }

    case "w": {
      forward = false;
      break;
    }

    case "s": {
      backward = false;
    }
  }
}
