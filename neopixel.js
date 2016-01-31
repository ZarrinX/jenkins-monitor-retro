'use strict';

var pixel = require("node-pixel"),
    five = require("johnny-five");

var board = new five.Board();
var strip = null;

board.on("ready", function () {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [{ pin: 6, length: 12 }, ], // this is preferred form for definition
    });

    strip.on("ready", function () {
        console.log('Writing colors');
        strip.color("rgb(5, 3, 0)"); // sets strip to green using rgb values
        strip.show();
    });
});