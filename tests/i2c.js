
var five = require("johnny-five");
var pixel = require("node-pixel");

var board = new five.Board();

var fps = 5;

board.on("ready", function() {

    var strip = new pixel.Strip({
        data: 6,
        length: 12,
        board: this,
        controller: "I2CBACKPACK"
    });

    strip.on("ready", function() {

        var colors = ["magenta"];
        var current_colors = [0,1,2,3,4];
        var current_pos = [0,1,2,3,4];
        var blinker = setInterval(function() {
            strip.color("#000");

            for (var i=0; i< current_pos.length; i++) {
                if (++current_pos[i] >= strip.stripLength()) {
                    current_pos[i] = 0;
                    if (++current_colors[i] >= colors.length) current_colors[i] = 0;
                }
                strip.pixel(current_pos[i]).color(colors[current_colors[i]]);
            }

            strip.show();
        }, 1000/fps);
    });
});