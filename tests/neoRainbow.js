var five = require("johnny-five");
var pixel = require("node-pixel");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

var fps = 5; // how many frames per second do you want to try?

board.on("ready", function() {

    console.log("Board ready, lets add light");

    strip = new pixel.Strip({
        data: 6,
        length: 12,
        board: this,
        controller: "FIRMATA",
    });

    strip.on("ready", function() {

        console.log("Strip ready, let's go");

        var colors = ["rgb(255, 255, 255)"];
        var current_colors = [0];
        var current_pos = [0];
        var blinker = setInterval(function() {

            strip.color("#000"); // blanks it out

            for (var i=0; i< current_pos.length; i++) {
                strip.color("rgb(0, 255, 0)");
                strip.show();
            }
        }, 1000/fps);
    });
});