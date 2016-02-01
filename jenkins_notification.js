'use strict';

var RED = 'rgb(10, 0, 0)',
    GREEN = 'rgb(0, 10, 0)',
    AMBER = 'rgb(10, 5, 0)',
    BLUE = 'rgb(0, 0, 10)';

var BLINK_TIME = 300;

var JENKINS_REFRESH_TIME = 10000;
var strip = null;

var fs = require('fs');
var creds = fs.readFileSync('C:\\jenkins.txt');

var five = require('johnny-five'),
    jenkins = require('jenkins')(creds.toString()),
    board = new five.Board(),
    pixel = require('node-pixel');

board.on('ready', function () {
});

//var getJobList = jenkins.job.list;

var updateLeds = function (job) {
    var ledAddress = null;

    switch (job) {
        case 'crm-ui-diagnostic-test':
            ledAddress = 0;
            break;
        case 'crm-ui-diagnostic-pr':
            ledAddress = 1;
            break;
        case 'crm-ui-diagnostic-master':
            ledAddress = 2;
            break;
        case 'crm-api-diagnostic-master':
            ledAddress = 3;
            break;
        case 'crm-api-diagnostic-live':
            ledAddress = 4;
            break;
        case 'crm-api-diagnostic-pr':
            ledAddress = 5;
            break;
        case 'crm-api-dns-live':
            ledAddress = 6;
            break;
        case 'crm-api-dns-master':
            ledAddress = 7;
            break;
        case 'crm-api-dns-pr':
            ledAddress = 8;
            break;
        case 'crm-deploy-master':
            ledAddress = 9;
            break;
        case 'crm-deploy-pr':
            ledAddress = 10;
            break;
        case 'crm-api-boostability-master':
            ledAddress = 11;
            break;
        default:
            ledAddress = null;
    }
    return ledAddress;
};



var updateStatus = function () {
    board.on('ready', function () {
        strip = new pixel.Strip({
            data: 6,
            length: 12,
            board: this,
            controller: 'FIRMATA',
        });
        

        strip.on('ready', function () {

            jenkins.job.list(function (err, jobList) {

                jobList.forEach(function (job) {
                    var led = updateLeds(job.name);
                    if (led !== null) {
                        var color;
                        var p = strip.pixel(led);
                        if (job.color === 'red_anime') { color = AMBER; }
                        else if (job.color === 'blue') { color = GREEN; }
                        else if (job.color === 'red') { color = RED; }
                        else { color = BLUE; }
                        p.color(color);
                        strip.show();
                        console.log('updating Job: ', job.name);
                    }
                });
            });

        });
    });
};

var init = function () {
    
    updateStatus();
    board.loop(JENKINS_REFRESH_TIME, updateStatus);
    
};



init();