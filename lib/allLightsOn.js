'use strict';



module.exports = allLightsOn;

function allLightsOn() {
    var pixel = require('../node_modules/node-pixel'),
        five = require('../node_modules/johnny-five');


    var board = new five.Board();
    var strip = null;

    board.on('ready', function () {

        strip = new pixel.Strip({
            board: this,
            controller: 'FIRMATA',
            strips: [{ pin: 6, length: 12 }, ], // this is preferred form for definition
        });
    });

    strip.on();
    var p = strip.pixel(0);
    p.color('rgb(0, 5, 0)');
    strip.show();
    p = strip.pixel(1);
    p.color('rgb(5, 0, 0)');
    strip.show();
    p = strip.pixel(2);
    p.color('rgb(0, 0, 5)');
    strip.show();


}