'use strict';

var jenkins = require('jenkins')('http://zrice:ac8b5edfdd3785e015ab2d7482ebaf96@crm2.int.test-godaddy.com/jenkins');

var getJobList = jenkins.job.list;

jenkins.job.list(function (err, data) {
    if (err) throw err;

    console.log('jobs', data);
});