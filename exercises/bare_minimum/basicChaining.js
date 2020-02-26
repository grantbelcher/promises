/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var newWriteFile = Promise.promisify(fs.writeFile)
var promisify = require('../../exercises/bare_minimum/promisification.js');
var promiseConstructor = require('../../exercises/bare_minimum/promiseConstructor.js')
var getGitHubProfileAsync = promisify.getGitHubProfileAsync;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(fileData) {

      return getGitHubProfileAsync(fileData);
    })
    .then(function(body) {
      return newWriteFile(writeFilePath, JSON.stringify(body));
    })


  // TODO

  // Call firstLineAsync on readFilePath
    // then use getGitHubProfileAsync on the return value
      // use getStatusCodeAsync and use fs.writeFile to append to filepath
  // console.log(getGitHubProfileAsync(readFilePath));
  // return getGitHubProfileAsync(readFilePath);

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
